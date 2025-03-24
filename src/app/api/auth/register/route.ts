import { NextResponse } from 'next/server';
import { UserRegistrationData } from '@/types/user';
import { getUserByEmail, getUserByUsername, registerUser } from '@/app/services/userServices';
import * as z from 'zod';


// Define schema for zod
const userSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters long",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
});

export async function POST(req: Request) {
    
    try {
        const body = await req.json();

        // Validate the rquest
        const result = userSchema.safeParse(body);
        if(!result.success) {
            return NextResponse.json({ message: 'Invalid registration input data'}, { status: 400 });
        }

        const data = result.data as UserRegistrationData;
        
        //Check if the user already exists (email and username)
        const existingUserByEmail = await getUserByEmail(data.email);
        if(existingUserByEmail) {
            return NextResponse.json({ message: 'User with the email already exists'}, { status: 400 });
        }

        const existingUserByUsername = await getUserByUsername(data.username);
        if(existingUserByUsername) {
            return NextResponse.json({ message: 'User with this username already exists'}, { status: 400 });
        }

        // Create the new user 
        const newUser = await registerUser(data);

        return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });

    } catch (error) {
        
        console.error('Resgistration error', error);
        return NextResponse.json({ message: 'Internal server error while registering user'}, { status: 500 });
    }


}