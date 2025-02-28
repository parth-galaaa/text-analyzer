"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface DeleteAlertDialog {
    onDelete: () => void; // Explicitly defining type
}

export default function DeleteAlertDialog({ onDelete }: DeleteAlertDialog) {
    return (
        <AlertDialog>
            {/* Button that opens the dialog */}
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
                    <DeleteIcon className="w-5 h-5" />
                </Button>
            </AlertDialogTrigger>

            {/* Alert Dialog Content */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will clear both the input and output fields. It cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

