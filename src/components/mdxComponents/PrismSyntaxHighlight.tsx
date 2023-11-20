'use client';
import { cn } from '@/utils/cn';
import { themes, Highlight, Prism } from 'prism-react-renderer';
import { Children } from 'react';

export const PrismSyntaxHighlight = ({ children, className, ...rest }) => {
  const child = Children.only(children);
  const { props } = child;
  const language = props.className?.replace(/language-/, '') ?? 'bash';
  const code = props.children;

  if (!code) {
    return null;
  }
  return (
    <Highlight code={code} language={language} theme={themes.dracula}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          <code
            className={cn(
              className,
              'block px-3 py-2 rounded-md text-sm font-mono overflow-x-auto my-6',
            )}
          >
            {tokens.slice(0, -1).map((line, i) => {
              const { key: divKey, ...rest } = getLineProps({ line, key: i });

              return (
                <div key={divKey as string} {...rest}>
                  {line.map((token, key) => {
                    const { key: spanKey, ...rest } = getTokenProps({
                      token,
                      key,
                    });
                    return <span key={spanKey as string} {...rest} />;
                  })}
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
};
