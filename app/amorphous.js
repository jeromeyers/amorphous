var Amorphous = window.Amorphous = (function() {
    function Amorphous(options) {
        this.options = options;

        function createRegion(configuration) {
            return {};
        }
        this.region = createRegion({});

        this.paintEm = function() {
            return true;
        }
    }
    return Amorphous;
})();