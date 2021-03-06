describe('number property validation', function() {

    describe('max', function() {

        var max = vlad(vlad.number.max(10));
        var exclusive = vlad(vlad.number.max(10).exclusive);

        it('throws when value is higher than max', function() {
            return max(11).should.be.rejected;
        });
        it('throws when the value is higher - exclusive', function() {
            return exclusive(10).should.be.rejected;
        });

        it('doesnt throw otherwise', function() {
            return max(10).should.be.fulfilled;
        });
        it('doesnt throw otherwise - exclusive', function() {
            return exclusive(9).should.be.fulfilled;
        });
    });

    describe('min', function() {

        var min = vlad(vlad.number.min(10));
        var exclusive = vlad(vlad.number.min(10).exclusive);

        it('throws when value is lower than min', function() {
            return min(9).should.be.rejected;
        });
        it('throws when the value is lower - exclusive', function() {
            return exclusive(10).should.be.rejected;
        });

        it('doesnt throw otherwise', function() {
            return min(10).should.be.fulfilled;
        });
        it('doesnt throw otherwise - exclusive', function() {
            return exclusive(11).should.be.fulfilled;
        });
    });
});
