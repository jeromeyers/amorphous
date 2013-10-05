beforeEach(function(){

    this.addMatchers({
        toHave: function(expected){
            var actual = this.actual;

            if ((typeof expected === 'string') && (actual[expected])) {
                return true;
            } else {
                return _(expected).every( function(prop){ return u.existy(actual[prop]);});
            }


        },
        isJquery: function() {
            console.log(this.actual);
            this.message = function() {
                if (!u.existy(this.actual)) return 'this.actual is undefined';
                return '{0} is not jquery'.format(this.actual);
            }
            return this.actual && u.existy(this.actual['jquery']);
        }
    })
})
