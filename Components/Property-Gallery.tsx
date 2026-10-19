'use client';

import Image from "next/image";
import { useState } from "react";

export interface PropertyImage {
    id: string,
    url: string,
    altText: string | null;
    isPrimary: boolean;
    order: number;
}


export default function PropertyGallery({ images }: { images: PropertyImage[] }) {

    const sorted = [...images].sort((a, b) => {
        if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
        return a.order - b.order;
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const active = sorted[activeIndex]
    const others = sorted.filter((_, i) => i !== activeIndex);

    if (!active) {
        return (
            <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                No image available
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {/* Main image */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Image
                    src={active.url}
                    alt={active.altText ?? "Property image"}
                    width={1200}
                    height={700}
                    priority
                    className="h-[420px] w-full object-cover"
                />
            </div>

            {/* Other images as thumbnails */}
            {others.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {others.map((img) => {
                        const originalIndex = sorted.findIndex((s) => s.id === img.id);
                        return (
                            <button
                                key={img.id}
                                type="button"
                                onClick={() => setActiveIndex(originalIndex)}
                                className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-slate-200 transition hover:border-amber-400"
                                aria-label="Show this image"
                            >
                                <Image
                                    src={img.url}
                                    alt={img.altText ?? "Property thumbnail"}
                                    fill
                                    sizes="112px"
                                    className="object-cover"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

