/****
 * Taken from https://github.com/gkaemmer/react-fade-in
 */

import React, { JSXElementConstructor, PropsWithChildren, useEffect, useState } from 'react';

interface Props {
  delay?: number;
  transitionDuration?: number;
  wrapperTag?: JSXElementConstructor<any>;
  childTag?: JSXElementConstructor<any>;
  className?: string;
  childClassName?: string;
  visible?: boolean;
  onComplete?: () => any;
}

export default function FadeIn({
  delay,
  transitionDuration,
  wrapperTag,
  childTag,
  className,
  childClassName,
  visible,
  children,
  onComplete: propsOnComplete,
  ...props
}: PropsWithChildren<Props>) {
  const [maxIsVisible, setMaxIsVisible] = useState(0);
  const cTransitionDuration = transitionDuration || 400;
  const cDelay = delay || 50;
  const WrapperTag = wrapperTag || 'div';
  const ChildTag = childTag || 'div';
  const cVisible = typeof visible === 'undefined' ? true : visible;

  let childCount = React.Children.count(children);

  useEffect(() => {
    let count = React.Children.count(children);
    if (!cVisible) {
      // Animate all children out
      count = 0;
    }

    if (count === maxIsVisible) {
      // We're done updating maxVisible, notify when animation is done
      const timeout = setTimeout(() => {
        if (propsOnComplete) propsOnComplete();
      }, cTransitionDuration);
      return () => clearTimeout(timeout);
    }

    // Move maxIsVisible toward count
    const increment = count > maxIsVisible ? 1 : -1;
    const timeout = setTimeout(() => {
      setMaxIsVisible(maxIsVisible + increment);
    }, cDelay);
    return () => clearTimeout(timeout);
  }, [childCount, cDelay, maxIsVisible, visible, cTransitionDuration, cVisible, children, propsOnComplete]);

  return (
    <WrapperTag className={className}>
      {React.Children.map(children, (child, i) => {
        return (
          <ChildTag
            className={childClassName}
            style={{
              transition: `opacity ${cTransitionDuration}ms, transform ${cTransitionDuration}ms`,
              transform: maxIsVisible > i ? 'none' : 'translateY(20px)',
              opacity: maxIsVisible > i ? 1 : 0,
            }}
          >
            {child}
          </ChildTag>
        );
      })}
    </WrapperTag>
  );
}
