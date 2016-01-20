describe('boolean property validation', function() {

    var validate = vlad(vlad.boolean);

    it('should accept true', function() {
        return validate(true).should.be.fulfilled
        .then(function(val) {
            expect(val).to.equal(true);
        });
    });

    it('should accept false', function() {
        return validate(false).should.be.fulfilled
        .then(function(val) {
            expect(val).to.equal(false);
        });
    });
});
