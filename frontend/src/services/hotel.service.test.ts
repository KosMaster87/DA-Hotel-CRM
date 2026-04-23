import { describe, expect, it } from 'vitest';

import { HotelService } from './hotel.service';

describe('HotelService', () => {
  it('returns all hotels sorted by name', () => {
    const service = new HotelService();

    service.create({ name: 'Zoo Hotel', city: 'Berlin' });
    service.create({ name: 'Airport Hotel', city: 'Hamburg' });

    expect(service.getAll().map((hotel) => hotel.name)).toEqual(['Airport Hotel', 'Zoo Hotel']);
  });

  it('creates and returns a hotel with generated id', () => {
    const service = new HotelService();

    const hotel = service.create({ name: 'Sunrise Hotel', city: 'Hamburg' });

    expect(hotel.id).toBeTruthy();
    expect(hotel.name).toBe('Sunrise Hotel');
    expect(hotel.city).toBe('Hamburg');
    expect(hotel.isActive).toBe(true);
  });

  it('throws when name is empty', () => {
    const service = new HotelService();

    expect(() => service.create({ name: '   ', city: 'Berlin' })).toThrow('Hotel name is required');
  });

  it('throws when city is empty', () => {
    const service = new HotelService();

    expect(() => service.create({ name: 'Sunrise Hotel', city: '   ' })).toThrow(
      'Hotel city is required'
    );
  });

  it('throws on duplicate hotel name in same city', () => {
    const service = new HotelService();

    service.create({ name: 'City Inn', city: 'Berlin' });

    expect(() => service.create({ name: 'city inn', city: 'berlin' })).toThrow(
      'Hotel already exists: city inn (berlin)'
    );
  });

  it('deactivates an existing hotel', () => {
    const service = new HotelService();
    const created = service.create({ name: 'Harbor Stay', city: 'Kiel' });

    const updated = service.deactivate(created.id);

    expect(updated.isActive).toBe(false);
    expect(service.getById(created.id).isActive).toBe(false);
  });

  it('throws when a hotel cannot be found by id', () => {
    const service = new HotelService();

    expect(() => service.getById('missing-id')).toThrow('Hotel not found: missing-id');
  });
});
