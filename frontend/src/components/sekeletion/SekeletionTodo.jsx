import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Clock, Ellipsis } from "lucide-react";

const CardSkeleton = () => {
    const skeletonCards = Array(4).fill(null);

    return (
        <>
            {skeletonCards.map((_, idx) => (
                <div
                    key={idx}
                    className="flex flex-col animate-pulse bg-primary/30 p-4 border border-slate-400 rounded-xl gap-y-2 "
                >
                    <div className="animate-pulse flex justify-between items-center">
                        <div className="flex gap-x-2 items-center">
                            <Skeleton width={16} height={16} />
                            <Skeleton width={120} height={24} />
                        </div>

                        <Skeleton width={24} height={24} />
                    </div>

                    <Skeleton count={1} height={16} />

                    <div className="flex items-center gap-1">
                        <Skeleton width={16} height={16} />
                        <Skeleton width={80} height={16} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default CardSkeleton;
