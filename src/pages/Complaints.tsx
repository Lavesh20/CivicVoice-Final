import React from 'react'; 
import { useQuery } from '@tanstack/react-query'; 
import {
    fetchComplaints,
    getSeverityStats,
    getDepartmentStats,
    getLocationStats,
    getPlatformStats,
    getTimelineData 
} from '@/services/analyticsService';  
import { Skeleton } from '@/components/ui/skeleton'; 
import AnalyticsHeader from '@/components/Complaints/AnalyticsHeader'; 
import ComplaintCard from '@/components/Complaints/ComplaintCart';  

interface Complaint {   
  _id: string;   
  referenceNumber: string;   
  content_platform: string;   
  content_platform_details: {     
    post_id: string;     
    date: string;     
    content: string;     
    username: string;     
    url: string;   
  };   
  department: string;   
  location: string;   
  name: string;   
  severity: string;   
  summary: string;   
  complaint_score: number; 
}

const SkeletonCard = () => (
  <div className="space-y-3">
    <Skeleton className="h-[180px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);  

const Analytics = () => {
  const { data: complaints, isLoading, error } = useQuery<Complaint[]>({
    queryKey: ['complaints'],
    queryFn: fetchComplaints,
  });   

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Failed to load data</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }   

  // Simply reverse the array to show from last to first
  const reversedComplaints = complaints ? [...complaints].reverse() : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 md:py-12 space-y-8 max-w-7xl">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-4 w-full max-w-3xl" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-16 w-24" />
            </div>
          </div>
        ) : (
          <AnalyticsHeader totalComplaints={reversedComplaints.length} />
        )}
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              reversedComplaints.map((complaint) => (
                <ComplaintCard 
                  key={complaint._id} 
                  complaint={complaint} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;