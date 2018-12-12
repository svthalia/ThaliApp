import i18n from '../../app/utils/i18n';

describe('i18n helper', () => {
  it('should export the correct i18n helper', () => {
    expect(i18n).toMatchSnapshot();
  });
});
