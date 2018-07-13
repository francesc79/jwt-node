const bcrypt = require('bcrypt');

describe('Test hash password', () => {
    it('should by crypted', async () => {

        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash('12345', salt);

        console.log ('PWD:' + hashed);

        expect(hashed).not.toBeUndefined();

        const result = await bcrypt.compare('12345', hashed)
        expect(result).toBe(true);
    });
});