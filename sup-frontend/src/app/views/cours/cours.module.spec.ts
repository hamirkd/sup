import { CoursModule } from './cours.module';

describe('CoursModule', () => {
  let coursModule: CoursModule;

  beforeEach(() => {
    coursModule = new CoursModule();
  });

  it('should create an instance', () => {
    expect(coursModule).toBeTruthy();
  });
});
