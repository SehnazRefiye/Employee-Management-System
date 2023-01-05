import { injectable, /* inject, */ BindingScope, Provider } from '@loopback/core';

export type Title = unknown;

@injectable({ scope: BindingScope.TRANSIENT })
export class TitleProvider implements Provider<Title> {
  constructor() { }

  value() {
    throw new Error('To be implemented');
  }
}
