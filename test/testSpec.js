describe("Amorphous", function() {
    beforeEach(function() {
        amorphous = new Amorphous({});
    });
    it('there should be an amorphous', function() {
        expect(amorphous).not.toBeNull();
    });
    it('a region should exist', function() {
        expect(amorphous.region).toBeTruthy();
    });
    it('it should paint them', function() {
        expect(amorphous.paintEm()).toBe(true);
    });
});

