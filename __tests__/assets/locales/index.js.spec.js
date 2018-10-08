import translations from '../../../app/assets/locales/index';

describe('translations', () => {
  it('should expose the translations', () => {
    expect(translations).toMatchSnapshot();
  });
});
