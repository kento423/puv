import React from "react";

type StatusType = "alpha" | "beta" | "coming-soon";

interface StatusBadgeProps {
    status: StatusType;
    className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
    const styles = {
        alpha: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
        beta: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
        "coming-soon": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    };

    const labels = {
        alpha: "Alpha",
        beta: "Beta",
        "coming-soon": "Coming Soon",
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[status]} ${className}`}>
            {labels[status]}
        </span>
    );
};

export default StatusBadge;
