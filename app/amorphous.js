var Amorphous = window.Amorphous = (function() {
    function Amorphous(options) {
        this.options = options;

        function createTopology(configuration) {
            return {};
        }
        this.topology = createTopology({});

        this.particleParameters = {
            regions: ['hi'],
            particles: ['hi'],
        };

        this.paintEm = function() {
            return true;
        }
    }
    return Amorphous;
})();
