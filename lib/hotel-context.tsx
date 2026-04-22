"use client";

import React, { createContext, useContext, useState } from 'react';

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  maxGuests: number;
  size: string;
}

interface BookingDetails {
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
}

interface HotelContextType {
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room) => void;
  booking: BookingDetails;
  updateBooking: (details: Partial<BookingDetails>) => void;
  calculateTotal: (price: number, checkIn: string, checkOut: string) => number;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRoom, setSelectedRoomState] = useState<Room | null>(null);
  const [booking, setBooking] = useState<BookingDetails>({
    room: null,
    checkIn: '',
    checkOut: '',
    guests: 1,
    totalPrice: 0,
  });

  const setSelectedRoom = (room: Room) => {
    setSelectedRoomState(room);
    setBooking(prev => ({ ...prev, room }));
  };

  const updateBooking = (details: Partial<BookingDetails>) => {
    setBooking(prev => ({ ...prev, ...details }));
  };

  const calculateTotal = (price: number, checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, nights) * price;
  };

  return (
    <HotelContext.Provider value={{ selectedRoom, setSelectedRoom, booking, updateBooking, calculateTotal }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) throw new Error('useHotel must be used within a HotelProvider');
  return context;
};
