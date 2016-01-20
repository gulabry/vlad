describe('date property validation', function() {

    var validate = vlad(vlad.date);

    //
    it ('should accept valid dates', function() {
        var now = new Date();

        return validate(now).should.be.fulfilled
        .then(function(val) {
            expect(val).to.equal(now);
        });
    });

    it('should reject invalid dates', function() {
        var date = new Date('asdfasdf');

        return validate(date).should.be.rejected
        .then(function(err) {
            expect(err).to.be.instanceof(vlad.FieldValidationError);
        });
    });
});
