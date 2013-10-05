describe("Amorphous", function() {

  it('it should paint them', function(){
      expect(paintEm()).toBe(true);
  });
    it('a region should exist', function() {
        expect(getRegion()).toBeTruthy();
    })
});

