import React from 'react'

interface NotificationProps {
    message: string,
    header: string,
    type?: string
}
export default function ContributionNotification({ header, message, type }: NotificationProps) {

    let notificationLookAttributes: string = 'bg-green-100 border-l-4 border-green-500 text-green-700 p-4'

    if ( type == 'error' ) {
        notificationLookAttributes = 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
    }

    return (
        <div className={ notificationLookAttributes } role="alert">
            <p className="font-bold">{ header }</p>
            <p>{ message }</p>
        </div>
    )

}