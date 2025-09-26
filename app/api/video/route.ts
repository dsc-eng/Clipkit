import { dbConnect } from "@/lib/db";
import Video from "@/models/video";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Video as VideoType } from "@/models/video";


export async function GET() {
    try {
        await dbConnect();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if(!videos || videos.length === 0){
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(videos);

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}

export async function POST(req: NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await dbConnect();

        const body: VideoType = await req.json();
 
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                width: 1080,
                height: 1920,
                quality: body.transformation?.quality ?? 100,
            },
        };
        const newVideo = await Video.create(videoData);

        return NextResponse.json(newVideo);
    } catch (error) {
        return NextResponse.json({ message: "Failed to create a video" }, { status: 500 });
    }
} 