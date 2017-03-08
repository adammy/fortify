(function ($) {
  module('jQuery.fortify');

  test('is fortify', function () {
    expect(2);
    strictEqual($.fortify(), 'fortify.', 'should be fortifyJ');
    strictEqual($.fortify({punctuation: '!'}), 'fortify!', 'should be thoroughly fortify');
  });

}(jQuery));
