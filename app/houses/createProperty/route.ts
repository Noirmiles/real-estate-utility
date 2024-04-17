import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { listPrice, state, city, address, squareFootage, numberOfRooms, numberOfBathrooms, propertyType, images } = await request.json();

    const property = await prisma.property.create({
      data: {
        listPrice: parseFloat(listPrice),
        state,
        city,
        address,
        squareFootage: parseFloat(squareFootage),
        numberOfRooms: parseInt(numberOfRooms),
        numberOfBathrooms: parseInt(numberOfBathrooms),
        propertyType,
        images: images ? { fileNames: images } : undefined,
      },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'An error occurred while creating the property.' }, { status: 500 });
  }
}