import {formatDate} from "@/lib/utils";
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Author, Startup} from "@/sanity/types";

export type StartupTypeCard  = Omit<Startup, "author"> & {author? : Author};

const StartupCard = ({post} : {post : StartupTypeCard}) => {

    const {_createdAt , views , author, title , category , _id , image ,description } = post;
    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup-card-date">
                     {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{views}</span>

                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-16-medium line-clamp-1">{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <p className="text-26-semibold line-clamp-1">{title}</p>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    {/*<Image*/}
                    {/*    src="https://palceholder.co/600*400" alt="palceholder"*/}
                    {/*    height={48}*/}
                    {/*    width={48}*/}
                    {/*    className="rounded-full"*/}
                    {/*/>*/}
                </Link>
                <Link href={`/startup/${_id}`}>
                    <p className="startup-card_desc">{description}</p>
                    <img src={image} alt="placeholder" />
                </Link>
                <div className="felx-between gap-3 mt-5">
                    <Link href={`/?query=${category?.toLowerCase()}`}>
                        <p className="text-16-medium">{category}</p>
                    </Link>
                    <Button className="startup-card_btn" asChild>
                        <Link href={`/startup/${_id}`}>
                            Details
                        </Link>
                    </Button>
                </div>
            </div>
        </li>
    )
}
export default StartupCard
