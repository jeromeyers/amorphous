var Amorphous = window.Amorphous = (function() {
    function Amorphous(parent, options) {
        var self = this;
        this.options = options || {};
        this.jparent = $(parent || 'div');

        // Topology
        function createTopology() {
            self.topologyOptions = {
                width: 500,
                height: 500
            };
            if (u.existy(self.options['width']) && u.existy(self.options['height'])) {
                self.topologyOptions.width = self.options['width'];
                self.topologyOptions.height = self.options['height'];
            }

            return {
                jtopology: (function() {
                    var jcanvas = $('<canvas class="topology" width="{0}" height="{1}"></canvas>'.format(self.topologyOptions.width, self.topologyOptions.height));
                    self.jparent.append(jcanvas);
                    return jcanvas;
                })()
            };
        }
        this.topology = createTopology();

        this.particleParameters = {
            regions: 5,
            particles: 1000
        };

        // Particles
        this.particles = {};
        this.regionColors = [
            '#FF0000',
            '#00FFFF',
            '#FFCC10',
            '#FFCC99',
            '#66CC99',
            '#FF0066',
            '#339966',
            '#9966CC',
            '#990066',
            '#000033',
            '#FF3322',
            '#006600'
        ];
        this.Particle = function(config) {
            this.x = u.getRandomNumber(self.topologyOptions.width);
            this.y = u.getRandomNumber(self.topologyOptions.height);
            this.region = u.getRandomNumber(self.particleParameters.regions);
        }
        this.paintEm = function() {
            var context = self.topology.jtopology[0].getContext('2d');
            for (var i = 0; i < self.particleParameters.particles; i++) {
                var particle = new this.Particle({});
                self.particles[i] = particle;
                context.fillStyle = self.regionColors[particle.region];
                context.fillRect(particle.x, particle.y, 2, 2);
            }
            return true;
        }
    }
    return Amorphous;
})();
