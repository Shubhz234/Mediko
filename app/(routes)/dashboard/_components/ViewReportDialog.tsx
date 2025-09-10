import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'
import { ClipboardCopy, Heart } from 'lucide-react'

type Props = {
    record: SessionDetail
}

const ViewReportDialog = ({ record }: Props) => {
    // Parse the report data from JSON
    const reportData = record.report as any;

    // Extract data with fallbacks
    const sessionInfo = {
        doctor: record.selectedDoctor?.specialist || 'General Physician',
        user: 'Anonymous', // You can modify this based on your user data
        consultedOn: moment(new Date(record.createdOn)).format('MMMM Do YYYY, h:mm a'),
        agent: `${record.selectedDoctor?.specialist || 'General Physician'} AI`
    };

    const chiefComplaint = reportData?.chiefComplaint || record.note;
    const summary = reportData?.summary;
    const symptoms = reportData?.symptoms || [];
    const duration = reportData?.duration;
    const severity = reportData?.severity;
    const medications = reportData?.medications || [];
    const recommendations = reportData?.recommendations || [];

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant={"outline"}><ClipboardCopy /> View Report</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle asChild>
                            <div className='text-center flex items-center justify-center gap-2'>
                                <Heart className="w-6 h-6 text-blue-500" />
                                <h2 className='text-2xl font-bold'>Medical AI Voice Agent Report</h2>
                            </div>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div className='space-y-6 mt-6'>
                                {/* Session Info */}
                                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200'>
                                    <h3 className='font-bold text-blue-700 text-lg mb-3 flex items-center gap-2'>
                                        <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                                        Session Info
                                    </h3>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                        <div className='bg-white p-2 rounded border-l-4 border-blue-400'>
                                            <span className='font-semibold text-blue-600'>Doctor: </span>
                                            <span className='text-gray-800'>{sessionInfo.doctor}</span>
                                        </div>
                                        <div className='bg-white p-2 rounded border-l-4 border-green-400'>
                                            <span className='font-semibold text-green-600'>User: </span>
                                            <span className='text-gray-800'>{sessionInfo.user}</span>
                                        </div>
                                        <div className='bg-white p-2 rounded border-l-4 border-purple-400'>
                                            <span className='font-semibold text-purple-600'>Consulted On: </span>
                                            <span className='text-gray-800'>{sessionInfo.consultedOn}</span>
                                        </div>
                                        <div className='bg-white p-2 rounded border-l-4 border-orange-400'>
                                            <span className='font-semibold text-orange-600'>Agent: </span>
                                            <span className='text-gray-800'>{sessionInfo.agent}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chief Complaint */}
                                {chiefComplaint && (
                                    <div className='border-t border-gray-200 pt-4'>
                                        <h3 className='font-bold text-red-600 text-lg mb-3 flex items-center gap-2'>
                                            <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                                            Chief Complaint
                                        </h3>
                                        <div className='bg-red-50 p-3 rounded-lg border-l-4 border-red-400'>
                                            <p className='text-gray-800 font-medium'>{chiefComplaint}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Summary */}
                                {summary && (
                                    <div className='border-t border-gray-200 pt-4'>
                                        <h3 className='font-bold text-indigo-600 text-lg mb-3 flex items-center gap-2'>
                                            <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                                            Summary
                                        </h3>
                                        <div className='bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400'>
                                            <p className='text-gray-800'>{summary}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Symptoms */}
                                {symptoms && symptoms.length > 0 && (
                                    <div className='border-t border-gray-200 pt-4'>
                                        <h3 className='font-bold text-orange-600 text-lg mb-3 flex items-center gap-2'>
                                            <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                                            Symptoms
                                        </h3>
                                        <div className='bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400'>
                                            <ul className='space-y-2'>
                                                {symptoms.map((symptom: string, index: number) => (
                                                    <li key={index} className='flex items-center gap-2 text-gray-800'>
                                                        <div className='w-1.5 h-1.5 bg-orange-500 rounded-full'></div>
                                                        {symptom}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Duration & Severity */}
                                {(duration || severity) && (
                                    <div className='border-t border-gray-200 pt-4'>
                                        <h3 className='font-bold text-purple-600 text-lg mb-3 flex items-center gap-2'>
                                            <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                                            Duration & Severity
                                        </h3>
                                        <div className='bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400'>
                                            <div className='space-y-2'>
                                                {duration && (
                                                    <div className='flex items-center gap-2'>
                                                        <span className='font-semibold text-purple-600'>Duration: </span>
                                                        <span className='text-gray-800 bg-white px-2 py-1 rounded text-sm'>{duration}</span>
                                                    </div>
                                                )}
                                                {severity && (
                                                    <div className='flex items-center gap-2'>
                                                        <span className='font-semibold text-purple-600'>Severity: </span>
                                                        <span className='text-gray-800 bg-white px-2 py-1 rounded text-sm'>{severity}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Medications Mentioned */}
                                {medications && medications.length > 0 && (
                                    <div className='border-t border-gray-200 pt-4'>
                                        <h3 className='font-bold text-green-600 text-lg mb-3 flex items-center gap-2'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                            Medications Mentioned
                                        </h3>
                                        <div className='bg-green-50 p-3 rounded-lg border-l-4 border-green-400'>
                                            <ul className='space-y-2'>
                                                {medications.map((medication: string, index: number) => (
                                                    <li key={index} className='flex items-center gap-2 text-gray-800'>
                                                        <div className='w-1.5 h-1.5 bg-green-500 rounded-full'></div>
                                                        <span className='bg-white px-2 py-1 rounded text-sm font-medium'>{medication}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Recommendations */}
                                {recommendations && recommendations.length > 0 && (
                                    <div className='border-t border-gray-200 pt-4'>
                                        <h3 className='font-bold text-teal-600 text-lg mb-3 flex items-center gap-2'>
                                            <div className='w-2 h-2 bg-teal-500 rounded-full'></div>
                                            Recommendations
                                        </h3>
                                        <div className='bg-teal-50 p-3 rounded-lg border-l-4 border-teal-400'>
                                            <ul className='space-y-2'>
                                                {recommendations.map((recommendation: string, index: number) => (
                                                    <li key={index} className='flex items-center gap-2 text-gray-800'>
                                                        <div className='w-1.5 h-1.5 bg-teal-500 rounded-full'></div>
                                                        {recommendation}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Disclaimer */}
                                <div className='border-t pt-4 mt-6'>
                                    <p className='text-sm text-gray-500 italic text-center'>
                                        This report was generated by an AI Medical Assistant for informational purposes only.
                                    </p>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ViewReportDialog