describe("Amorphous", function() {
    beforeEach(function() {
        amorphous = new Amorphous({});
    });

    it('there should be an amorphous', function() {
        expect(amorphous).not.toBeNull();
    });

    it('a topology should exist', function() {
        expect(amorphous.topology).toBeTruthy();
    });

    it('it should paint them', function() {
        expect(amorphous.paintEm()).toBe(true);
    });

    it('should have particle parameters', function(){
        expect(amorphous.particleParameters).not.toBeNull()
    })

    it('should have particle parameters to have colors', function(){
        expect(amorphous.particleParameters).toHave(['regions', 'particles'])
    })

});

