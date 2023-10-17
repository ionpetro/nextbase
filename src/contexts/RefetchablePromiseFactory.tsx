/**
 * NOTE: This file is only needed until parallel routing slots start working as expected.
 * Once that is completed, this data fetching can be done directly at the slot server component level.
 */

// Importing necessary modules
'use client';
import EventEmitter from 'events';
import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from 'react';
import { useFreshCallback } from 'rooks';
import { memoizePromise } from '@/utils/memoizePromise';
import Emittery from 'emittery';

type RefetchPromise = (tag: string) => void;

type RefetchablePromiseFactoryContextType = {
  refetchPromise: RefetchPromise;
  eventEmitter: Emittery;
};

export const RefetchablePromiseFactoryContext =
  createContext<RefetchablePromiseFactoryContextType>(
    {} as RefetchablePromiseFactoryContextType,
  );

function tagToEventName(tag: string) {
  return `nextbase-use-hook-refetch-${tag}`;
}

export function RefetchablePromiseFactoryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Creating an event emitter
  const eventEmitter = useMemo(() => {
    return new Emittery();
  }, []);
  // Function to refetch promise with given tag
  // When the promise is recreated, it tells the `use` hook to refetch the data

  const refetchPromise = useCallback(
    function (tag: string) {
      eventEmitter.emit(tagToEventName(tag));
    },
    [eventEmitter],
  );
  // Creating context value

  const contextValue = useMemo(() => {
    return {
      refetchPromise,
      eventEmitter,
    };
  }, [refetchPromise, eventEmitter]);
  // Returning provider with context value

  return (
    <RefetchablePromiseFactoryContext.Provider value={contextValue}>
      {children}
    </RefetchablePromiseFactoryContext.Provider>
  );
}

// Hook to use refetchable promise factory
export function useRefetchablePromiseFactory<T>(
  promiseFactory: () => Promise<T>,
  tag: string,
): T {
  // This memoization is needed because for in dev mode
  // the data fetching function is being called twice or sometimes more
  // because of the dev mode unmount/remount logic and `use` hook here.
  const [promise, setPromise] = useState<Promise<T>>(
    memoizePromise(promiseFactory, 'initial' + tag, {
      expire: 10000,
    }),
  );
  const { eventEmitter } = useContext(RefetchablePromiseFactoryContext);
  const eventIdentifier = tagToEventName(tag);
  // useTransition seems to be buggy with the use hook
  const refetchCallback = useCallback(() => {
    const newPromise = memoizePromise(promiseFactory, tag);
    // Create new promise and trigger `use` to fetch promise data
    // startTransition ensures that the state update is in background and doesn't block the UI
    startTransition(() => {
      setPromise(newPromise);
    });
  }, [promiseFactory, tag]);
  // Avoid any closure issues through eventEmitter
  const refetch = useFreshCallback(refetchCallback);

  useEffect(() => {
    if (!eventEmitter) return;
    eventEmitter.on(eventIdentifier, refetch);
    return () => {
      eventEmitter.off(eventIdentifier, refetch);
    };
  }, [eventEmitter]);

  return use(promise);
}

// Hook to use refetch suspendable
export function useRefetchSuspendable() {
  return useContext(RefetchablePromiseFactoryContext).refetchPromise;
}
