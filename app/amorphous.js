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
                })(),
                getContext: function() {
                    if (self.topology.jtopology) return self.topology.jtopology[0].getContext('2d');
                    else return null;
                },
                clear: function() {
                    if (self.topology.jtopology)
                    var context = self.topology.getContext();
                    context.fillStyle = '#FFFFFF';
                    context.fillRect(0,0,self.topologyOptions.width, self.topologyOptions.height);
                }
            };
        }
        this.topology = createTopology();

        this.particleParameters = {
            regions: u.existy(options.regions) ? options.regions : 5,
            particles: u.existy(options.particles) ? options.particles : 1000
        };

        // Particles
        this.particles = {};
        this.regionColors = [
            '#000000',
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
        var particleCount = 0;
        this.Particle = function(config) {
            this.id = particleCount++;
            this.x = u.getRandomNumber(self.topologyOptions.width);
            this.y = u.getRandomNumber(self.topologyOptions.height);
            this.regionId = u.getRandomNumber(self.particleParameters.regions);
            this.neighbors = [];
        }
        this.paintEm = function() {
            function createAll() {
                for (var i = 0; i < self.particleParameters.particles; i++) {
                    self.particles[i] = new self.Particle({});
                }
            }
            createAll();

            function paintAll() {
                var context = self.topology.getContext();
                _(self.particles).each(function(particle, index) {
                    context.fillStyle = self.regionColors[u.existy(particle.temporaryRegionId) ? particle.temporaryRegionId : particle.regionId];
                    context.fillRect(particle.x, particle.y, 2, 2);
                    if (u.existy(particle.temporaryRegionId)) particle.temporaryRegionId = null;
                });
            }
            paintAll();

            function initNeightbors() {
                function isNeighbor(particle1, particle2) {
                    if (particle2.x < (particle1.x + 20) && particle2.x > (particle1.x - 20)) {
                        if (particle2.y < (particle1.y + 20) && particle2.y > (particle1.y - 20)) {
                            return true;
                        }
                    }
                    return false;
                }
                _(self.particles).each(function(particle, index) {
                    _(self.particles).each(function(innerparticle) {
                        if (particle.id !== innerparticle.id) {
                            if (isNeighbor(particle, innerparticle))  {
                                particle.neighbors.push(innerparticle);
                            }
                        }
                    });
                });
            }
            initNeightbors();

            function glimmer() {
                (function myLoop(i) {
                    setTimeout(function() {
                        self.topology.clear();
                        var particle = self.particles[i-1];
                        particle.temporaryRegionId = 0;
                        _.each(particle.neighbors, function(neighbor) {
                            neighbor.temporaryRegionId = 0;
                        });
                        paintAll();
                        console.log(i);
                        if (--i) myLoop(i);
                        else paintAll();
                    }, 100)
                })(_(self.particles).keys().length);
            }
            glimmer();

            return true;
        }
    }
    return Amorphous;
})();
