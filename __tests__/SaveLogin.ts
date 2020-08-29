import { SaveLogin } from '../src/api/SaveLogin';

test('Tests for SaveLogin', () => {
    // Save data
    const data: SaveLogin.Data = { id: 1001, rawId: 'info@etsoo.com' };
    SaveLogin.save(data);

    expect(SaveLogin.get()?.id).toBe(1001);

    // Update data
    SaveLogin.update('1234');

    expect(SaveLogin.get()?.token).toBe('1234');
});
