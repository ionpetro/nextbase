'use client';
import { motion } from 'framer-motion';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="h-screen w-full grid overflow-hidden"
      style={{
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      {children}
    </motion.div>
  );
}
