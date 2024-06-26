// app/houses/createProperty/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const listPrice = formData.get('listPrice') as string;
    const state = formData.get('state') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const zipcode = formData.get('zipcode') as string;
    const squareFootage = formData.get('squareFootage') as string;
    const numberOfRooms = formData.get('numberOfRooms') as string;
    const numberOfBathrooms = formData.get('numberOfBathrooms') as string;
    const propertyType = formData.get('propertyType') as string;
    const images = formData.getAll('images') as File[];
    const agencyName = formData.get('agencyName') as string;
    const agentName = formData.get('agentName') as string;
    const description = formData.get('description') as string;
    const subdivision = formData.get('subdivision') as string;
    const alarmCode = formData.get('alarmCode') as string;

    const imageNames: string[] = [];

    for (const image of images) {
      const imageName = image.name;
      const imagePath = path.join(process.cwd(), 'public', 'houses', imageName);
      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.writeFile(imagePath, buffer);
      imageNames.push(imageName);
    }

    const property = await prisma.property.create({
      data: {
        listPrice: parseFloat(listPrice),
        state,
        city,
        address,
        zipcode: parseInt(zipcode),
        squareFootage: parseFloat(squareFootage),
        numberOfRooms: parseInt(numberOfRooms),
        numberOfBathrooms: parseInt(numberOfBathrooms),
        propertyType,
        images: imageNames,
        agencyName,
        agentName,
        description,
        subdivision,
        alarmCode: parseInt(alarmCode),
      },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating property:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'An error occurred while creating the property.', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred while creating the property.' }, { status: 500 });
    }
  }
}