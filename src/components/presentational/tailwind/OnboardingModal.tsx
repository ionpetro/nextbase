'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/Dialog';
import { ReactNode, useState } from 'react';
import InfoIcon from 'lucide-react/dist/esm/icons/info';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/AspectRatio';

type OnboardingFeature = {
    title: string;
    description: ReactNode;
    image: string;
};

export function OnboardingModal({
    featureList,
}: {
    featureList: OnboardingFeature[];
}) {
    const [open, setOpen] = useState(false);
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

    const handleNext = () => {
        setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % featureList.length);
    };

    const handlePrevious = () => {
        setCurrentFeatureIndex(
            (prevIndex) => (prevIndex - 1 + featureList.length) % featureList.length
        );
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentFeatureIndex(0);
    };

    const currentFeature = featureList[currentFeatureIndex];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 px-0 text-muted-foreground focus:ring-none"
                >
                    <InfoIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="p-8">
                <div className="object-fit ">
                    <p className="text-base text-muted-foreground font-bold mb-4">
                        {currentFeatureIndex + 1} / {featureList.length}
                    </p>
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={currentFeature.image}
                            alt="feature"
                            className="rounded-lg object-cover border"
                            layout="fill"
                        />
                    </AspectRatio>
                    <p className=" mt-6 text-2xl font-bold">{currentFeature.title}</p>
                    <div className="mt-2 text-base text-muted-foreground">
                        {currentFeature.description}
                    </div>
                </div>

                <DialogFooter className="flex space-x-2">
                    {currentFeatureIndex !== 0 ? (
                        <Button variant="outline" onClick={handlePrevious}>
                            Previous
                        </Button>
                    ) : null}
                    {currentFeatureIndex < featureList.length - 1 ? (
                        <Button variant="default" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button variant="default" onClick={handleClose}>
                            Close
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
