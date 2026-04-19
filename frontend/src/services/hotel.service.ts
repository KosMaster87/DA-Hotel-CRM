export interface Hotel {
  id: string;
  name: string;
  city: string;
  isActive: boolean;
  createdAt: Date;
}

export interface CreateHotelDto {
  name: string;
  city: string;
}

export class HotelService {
  private readonly hotels: Hotel[] = [];

  getAll(): Hotel[] {
    return [...this.hotels].sort((a, b) => a.name.localeCompare(b.name));
  }

  getById(id: string): Hotel {
    const hotel = this.hotels.find((entry) => entry.id === id);

    if (!hotel) {
      throw new Error(`Hotel not found: ${id}`);
    }

    return hotel;
  }

  create(dto: CreateHotelDto): Hotel {
    const name = dto.name.trim();
    const city = dto.city.trim();

    if (!name) {
      throw new Error('Hotel name is required');
    }

    if (!city) {
      throw new Error('Hotel city is required');
    }

    const duplicate = this.hotels.some(
      (entry) =>
        entry.name.toLowerCase() === name.toLowerCase() &&
        entry.city.toLowerCase() === city.toLowerCase()
    );

    if (duplicate) {
      throw new Error(`Hotel already exists: ${name} (${city})`);
    }

    const createdHotel: Hotel = {
      id: crypto.randomUUID(),
      name,
      city,
      isActive: true,
      createdAt: new Date(),
    };

    this.hotels.push(createdHotel);

    return createdHotel;
  }

  deactivate(id: string): Hotel {
    const hotel = this.getById(id);
    hotel.isActive = false;
    return hotel;
  }
}

export const hotelService = new HotelService();
