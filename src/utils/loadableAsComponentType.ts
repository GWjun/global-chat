import type { ComponentType } from 'react'
import loadable, { type DefaultComponent } from '@loadable/component'

type loadableParams = Parameters<typeof loadable>

/**
 * A thin wrapper around `loadable` that preserves its argument types
 * and casts the result to a React ComponentType.
 *
 * @param loadFn - A function that returns a promise resolving to a React component.
 * @param options - Optional loadable options.
 */
export function loadableAsComponentType<P>(
  loadFn: (props: P) => Promise<DefaultComponent<P>>,
  options?: loadableParams[1],
): ComponentType<P> {
  return loadable(loadFn, options) as ComponentType<P>
}
