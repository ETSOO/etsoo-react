import { SaveLogin, SaveLoginData } from '../src/api/SaveLogin';

test('Tests for SaveLogin', () => {
    const { get, save, update } = SaveLogin;

    // Save data
    const data: SaveLoginData = { id: 1001, rawId: 'info@etsoo.com' };
    save(data);

    expect(get()?.id).toBe(1001);

    // Update data
    update('1234');

    expect(get()?.token).toBe('1234');
});
