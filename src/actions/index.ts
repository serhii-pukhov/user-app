"use server";
import { db } from '@/db';
import { redirect } from 'next/navigation';
import ExcelJS from 'exceljs';

export async function findUsers() {
    return await db.user.findMany();
}

export async function createUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const user = await db.user.create({
        data: {
            name,
            email
        }
    })
    console.log(user);
}

export async function createUsers(parsedUsers: ParsedUser[]) {
    const users = await db.user.createMany(
        {
            data: parsedUsers
        }
    );
}

export async function deleteAllUsers() {
    return await db.user.deleteMany();
}

export async function deleteUser(id: string) {
    return await db.user.delete({
        where: {
            id
        }
    });
    redirect("/");
}

interface ParsedUser {
    name: string;
    email: string;
}

export async function exportUsers(file: File): Promise<ParsedUser[]> {
    const fileBuffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.getWorksheet(1);

    const parsedData: ParsedUser[] = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { // Skip the header row
            const rowData: ParsedUser = {
                name: row.getCell(1).value as string,
                email: row.getCell(2).value as string,
            };
            parsedData.push(rowData);
        }
    });

    createUsers(parsedData);

    return parsedData;
}