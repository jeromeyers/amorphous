var Amorphous = window.Amorphous = (function() {
    function Amorphous(parent, options) {
        var self = this;
        this.options = options;
        this.jparent = $(parent || 'div');

        function createTopology(configuration) {
            return {
                jtopology: (function() {
                    var x = $('<div class="topology"><button>hello</button></div>');
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
