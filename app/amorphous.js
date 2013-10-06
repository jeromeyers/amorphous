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
            regions: u.existy(options.regions) ? options.regions : 5, // this is more properly a part of topologyOptions
            particles: u.existy(options.particles) ? options.particles : 1000,
            neighbors: 20
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
        this.regions = [];
        do {
            var candidate = u.getRandomNumber(self.particleParameters.regions);
            if (!u.existy(self.regions[candidate])) {
                self.regions.push(candidate);
            }
        } while (this.regions.length < self.particleParameters.regions);

        var particleCount = 0;
        this.Particle = function(config) {
            this.id = particleCount++;
            this.x = u.getRandomNumber(self.topologyOptions.width);
            this.y = u.getRandomNumber(self.topologyOptions.height);
            this.regionId = self.regions[u.getRandomNumber(self.particleParameters.regions)];
            this.neighbors = [];
        }
        this.byXandY = {};
        this.paintEm = function() {
            function createAll() {
                for (var i = 0; i < self.particleParameters.particles; i++) {
                    var particle = new self.Particle({});
                    self.particles[i] = particle;
                    if (!u.existy(self.byXandY[particle.x])) self.byXandY[particle.x] = {};
                    self.byXandY[particle.x][particle.y] = particle;
                }
            }
            createAll();

            function paintAll() {
                var context = self.topology.getContext();
                _(self.particles).each(function(particle) {
                    context.fillStyle = self.regionColors[u.existy(particle.temporaryRegionId) ? particle.temporaryRegionId : (particle.regionId || 1)];
                    context.fillRect(particle.x, particle.y, 2, 2);
                    if (u.existy(particle.temporaryRegionId)) particle.temporaryRegionId = null;
                });
            }
            paintAll();

            function initNeightbors() {
                var directions = {
                    down: function(y) {
                        y.y += 1;
                    },
                    right: function(y) {
                        y.x += 1;
                    },
                    left: function(y) {
                        y.x -= 1;
                    },
                    up: function(y) {
                        y.y -= 1;
                    },
                    changeDirection: function(y) {
                        y.direction = u.cycleThroughArray(y.ops, y.direction);
                        y.timesDirectionCalled = 0;
                    },
                    isValidCoordinate: function(y) {
                        if (y.x < 0 || y.x > self.topologyOptions.width) return false;
                        if (y.y < 0 || y.y > self.topologyOptions.height) return false;
                        return true;
                    }
                };
                _(self.particles).each(function(particle) {
                    var y = { radius: 1, found: 0, offset: 1, ticktock: 1, x: particle.x, y: particle.y, direction: 'right', ops:['right', 'down', 'left', 'up'], timesDirectionCalled: 0 };
                    u.giveYtoXuntilZisTrue(y, function(y) {
                        // mutate x,y by moving in direction but don't do so more than offset number of times
                        directions[y.direction](y);
                        y.timesDirectionCalled += 1;
                        if (y.offset === y.timesDirectionCalled) {
                            directions.changeDirection(y);
                        }

                        // apply function
                        if (directions.isValidCoordinate(y)) {
                            var potentialNeighbor = u.existy(self.byXandY[y.x]) ? self.byXandY[y.x][y.y] : null;
                            if (u.existy(potentialNeighbor) && particle.neighbors.indexOf(potentialNeighbor) === -1) {
                                particle.neighbors.push(potentialNeighbor);
                                y.found += 1;
                            }
                        }

                        // do ticktocking
                        if (y.ticktock === 1) y.ticktock = 2;
                        else {
                            y.offset += 1;
                            y.ticktock = 1;
                        }
                    }, function(y) {
                        // loop through until we've found as many neighbors as we want
                        if (y.found >= self.particleParameters.neighbors || (y.x > self.topologyOptions.width && y.y < self.topologyOptions.height)) {
                            return true;
                        }
                        return false;
                    });
                });


                //                function isNeighbor(particle1, particle2, radius) {
                //                    if (particle2.x < (particle1.x + radius) && particle2.x > (particle1.x - radius)) {
                //                        if (particle2.y < (particle1.y + radius) && particle2.y > (particle1.y - radius)) {
                //                            return true;
                //                        }
                //                    }
                //                    return false;
                //                }
                //                _(self.particles).each(function(particle) {
                //                    _(self.particles).each(function(innerparticle) {
                //                        if (particle.id !== innerparticle.id) {
                //                            if (isNeighbor(particle, innerparticle))  {
                //                                particle.neighbors.push(innerparticle);
                //                            }
                //                        }
                //                    });
                //                });
            }
            initNeightbors();

            function glimmerNeighbors() {
                var iterations = _(self.particles).keys().length;
                u.spaceOutSoManyRunsOf(100, iterations, function(index) {
                    self.topology.clear();
                    var particle = self.particles[index - 1];
                    particle.temporaryRegionId = 0;
                    _.each(particle.neighbors, function(neighbor) {
                        neighbor.temporaryRegionId = 0;
                    });
                    paintAll();
                }, paintAll);
            }
//            glimmerNeighbors();  // Takes a long time, maybe just glimmer one out of 10

            function loopParticlesByEach(func) {
                _(self.particles).each(func);
            }
            function loopParticlesByXandY(func) {
                for (var x in self.byXandY) {
                    for (var y in self.byXandY[x]) {
                        var particle = self.byXandY[x][y];
                        if (u.existy(particle)) func(particle);
                    }
                }
            }

            var changed = 0;
            function localClustering() {
                function cluster() {
                    var loop = { cur: 0, max: self.regions.length };
                    var used = {};
                    loopParticlesByXandY(function(particle) {
                        loop = u.cycle(loop);
                        if (loop.cur === 0) used = {};
                        if (!u.existy(used[particle.id])) {
                            var min = particle.regionId;
                            var minId = particle.id;
                            _.each(particle.neighbors, function(neighbor) {
                                if (neighbor.regionId < min && !u.existy(used[neighbor.id])) {
                                    min = neighbor.regionId;
                                    minId = neighbor.id;
                                }
                            });
                            if (particle.regionId !== min) {
                                particle.regionId = min;
                                used[min] = true;
                                changed++;
                            }
                        }
                    });
                }
                u.spaceOutSoManyRunsOf(100, 10, function() {
                    cluster();
                    paintAll();
                }, paintAll);
            }
            localClustering();

            function regularize() {

            }
            regularize();

            return true;
        }
    }
    return Amorphous;
})();
