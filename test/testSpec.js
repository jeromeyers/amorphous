describe("Amorphous", function() {
    beforeEach(function() {
        jcontainer = $('<div></div>').append('<div class="amorphous-container"></div>');
        amorphous = new Amorphous(jcontainer.find('.amorphous-container'), {});
    });

    it('there should be an amorphous', function() {
        expect(amorphous).not.toBeNull();
    });

    it('a topology should exist', function() {
        expect(amorphous.topology).toBeTruthy();
    });

    it('topology has a visual container', function() {
        expect(amorphous.topology.jtopology).isJquery();
    });

    it('test container contains topology element', function() {
        expect(jcontainer.find('.topology')).toBe('canvas');
    });

    it('creating ')

    it('it should paint them', function() {
        amorphous.paintEm();
        expect(_.keys(amorphous.particles).length === amorphous.particleParameters.particles).toBe(true);
    });

    it('should have particle parameters', function(){
        expect(amorphous.particleParameters).not.toBeNull()
    });

    it('particle parameters has required fields', function(){
        expect(amorphous.particleParameters).toHave(['regions', 'particles'])
    });



});

