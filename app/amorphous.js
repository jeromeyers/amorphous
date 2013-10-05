var Amorphous = window.Amorphous = (function() {
    function Amorphous(parent, options) {
        var self = this;
        this.options = options;
        this.jparent = $(parent || 'div');

        function createTopology(configuration) {
            return {
                jtopology: (function() {
                    var x = $('<canvas class="topology" width="500" height="500"></canvas>');
                    self.jparent.append(x);
                    return x;
                })()
            };
        }
        this.topology = createTopology({});

        this.particleParameters = {
            regions: ['hi'],
            particles: ['hi']
        };

        this.paintEm = function() {
            return true;
        }
    }
    return Amorphous;
})();
