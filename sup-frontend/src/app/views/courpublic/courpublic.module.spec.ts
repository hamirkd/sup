import { CourpublicModule } from './courpublic.module';

describe('CourpublicModule', () => {
  let courpublicModule: CourpublicModule;

  beforeEach(() => {
    courpublicModule = new CourpublicModule();
  });

  it('should create an instance', () => {
    expect(courpublicModule).toBeTruthy();
  });
});
