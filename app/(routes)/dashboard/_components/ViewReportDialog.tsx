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
import { Heart } from 'lucide-react'

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
                    <Button variant={"link"} className="text-green-600 hover:text-green-700 font-semibold">View Report</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50">
                    <DialogHeader>
                        <DialogTitle asChild>
                            <div className='text-center flex flex-col items-center justify-center gap-3 pb-4 border-b border-gray-200/50 dark:border-gray-700/50'>
                                <div className="p-3 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full">
                                    <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h2 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent'>Medical AI Voice Agent Report</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Comprehensive consultation summary</p>
                            </div>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div className='space-y-6 mt-6 text-left'>
                                {/* Session Info */}
                                <div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 md:p-6 rounded-2xl border border-green-200/50 dark:border-green-700/30'>
                                    <h3 className='font-bold text-green-700 dark:text-green-400 text-lg md:text-xl mb-4 flex items-center gap-2'>
                                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                                        Session Info
                                    </h3>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='bg-white/80 dark:bg-gray-800/80 p-3 rounded-xl border-l-4 border-green-400'>
                                            <span className='font-semibold text-green-600 dark:text-green-400'>Doctor: </span>
                                            <span className='text-gray-800'>{sessionInfo.doctor}</span>
                                        </div>
                                        <div className='bg-white/80 dark:bg-gray-800/80 p-3 rounded-xl border-l-4 border-blue-400'>
                                            <span className='font-semibold text-blue-600 dark:text-blue-400'>User: </span>
                                            <span className='text-gray-800'>{sessionInfo.user}</span>
                                        </div>
                                        <div className='bg-white/80 dark:bg-gray-800/80 p-3 rounded-xl border-l-4 border-purple-400'>
                                            <span className='font-semibold text-purple-600 dark:text-purple-400'>Consulted On: </span>
                                            <span className='text-gray-800'>{sessionInfo.consultedOn}</span>
                                        </div>
                                        <div className='bg-white/80 dark:bg-gray-800/80 p-3 rounded-xl border-l-4 border-orange-400'>
                                            <span className='font-semibold text-orange-600 dark:text-orange-400'>Agent: </span>
                                            <span className='text-gray-800'>{sessionInfo.agent}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chief Complaint */}
                                {chiefComplaint && (
                                    <div className='border-t border-gray-200/50 dark:border-gray-700/50 pt-6'>
                                        <h3 className='font-bold text-red-600 dark:text-red-400 text-lg md:text-xl mb-4 flex items-center gap-2'>
                                            <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                            Chief Complaint
                                        </h3>
                                        <div className='bg-red-50/80 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-400'>
                                            <p className='text-gray-800 dark:text-gray-200 font-medium'>{chiefComplaint}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Summary */}
                                {summary && (
                                    <div className='border-t border-gray-200/50 dark:border-gray-700/50 pt-6'>
                                        <h3 className='font-bold text-indigo-600 dark:text-indigo-400 text-lg md:text-xl mb-4 flex items-center gap-2'>
                                            <div className='w-3 h-3 bg-indigo-500 rounded-full'></div>
                                            Summary
                                        </h3>
                                        <div className='bg-indigo-50/80 dark:bg-indigo-900/20 p-4 rounded-xl border-l-4 border-indigo-400'>
                                            <p className='text-gray-800 dark:text-gray-200'>{summary}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Symptoms */}
                                {symptoms && symptoms.length > 0 && (
                                    <div className='border-t border-gray-200/50 dark:border-gray-700/50 pt-6'>
                                        <h3 className='font-bold text-orange-600 dark:text-orange-400 text-lg md:text-xl mb-4 flex items-center gap-2'>
                                            <div className='w-3 h-3 bg-orange-500 rounded-full'></div>
                                            Symptoms
                                        </h3>
                                        <div className='bg-orange-50/80 dark:bg-orange-900/20 p-4 rounded-xl border-l-4 border-orange-400'>
                                            <ul className='space-y-3'>
                                                {symptoms.map((symptom: string, index: number) => (
                                                    <li key={index} className='flex items-center gap-3 text-gray-800 dark:text-gray-200'>
                                                        <div className='w-2 h-2 bg-orange-500 rounded-full flex-shrink-0'></div>
                                                        {symptom}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Duration & Severity */}
                                {(duration || severity) && (
                                    <div className='border-t border-gray-200/50 dark:border-gray-700/50 pt-6'>
                                        <h3 className='font-bold text-purple-600 dark:text-purple-400 text-lg md:text-xl mb-4 flex items-center gap-2'>
                                            <div className='w-3 h-3 bg-purple-500 rounded-full'></div>
                                            Duration & Severity
                                        </h3>
                                        <div className='bg-purple-50/80 dark:bg-purple-900/20 p-4 rounded-xl border-l-4 border-purple-400'>
                                            <div className='space-y-3'>
                                                {duration && (
                                                    <div className='flex items-center gap-3'>
                                                        <span className='font-semibold text-purple-600 dark:text-purple-400'>Duration: </span>
                                                        <span className='text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 px-3 py-1.5 rounded-lg text-sm font-medium'>{duration}</span>
                                                    </div>
                                                )}
                                                {severity && (
                                                    <div className='flex items-center gap-3'>
                                                        <span className='font-semibold text-purple-600 dark:text-purple-400'>Severity: </span>
                                                        <span className='text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 px-3 py-1.5 rounded-lg text-sm font-medium'>{severity}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Medications Mentioned */}
                                {medications && medications.length > 0 && (
                                    <div className='border-t border-gray-200/50 dark:border-gray-700/50 pt-6'>
                                        <h3 className='font-bold text-green-600 dark:text-green-400 text-lg md:text-xl mb-4 flex items-center gap-2'>
                                            <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                                            Medications Mentioned
                                        </h3>
                                        <div className='bg-green-50/80 dark:bg-green-900/20 p-4 rounded-xl border-l-4 border-green-400'>
                                            <ul className='space-y-3'>
                                                {medications.map((medication: string, index: number) => (
                                                    <li key={index} className='flex items-center gap-3 text-gray-800 dark:text-gray-200'>
                                                        <div className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0'></div>
                                                        <span className='bg-white/80 dark:bg-gray-800/80 px-3 py-1.5 rounded-lg text-sm font-medium'>{medication}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Recommendations */}
                                {recommendations && recommendations.length > 0 && (
                                    <div className='border-t border-gray-200/50 dark:border-gray-700/50 pt-6'>
                                        <h3 className='font-bold text-teal-600 dark:text-teal-400 text-lg md:text-xl mb-4 flex items-center gap-2'>
                                            <div className='w-3 h-3 bg-teal-500 rounded-full'></div>
                                            Recommendations
                                        </h3>
                                        <div className='bg-teal-50/80 dark:bg-teal-900/20 p-4 rounded-xl border-l-4 border-teal-400'>
                                            <ul className='space-y-3'>
                                                {recommendations.map((recommendation: string, index: number) => (
                                                    <li key={index} className='flex items-start gap-3 text-gray-800 dark:text-gray-200'>
                                                        <div className='w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2'></div>
                                                        {recommendation}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Disclaimer */}
                                <div className='border-t border-gray-200/50 dark:border-gray-700/50 pt-6 mt-8'>
                                    <div className='bg-gray-50/80 dark:bg-gray-800/50 p-4 rounded-xl text-center'>
                                        <p className='text-sm text-gray-600 dark:text-gray-400 italic'>
                                        This report was generated by an AI Medical Assistant for informational purposes only.
                                        </p>
                                        <p className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                                            Please consult with a qualified healthcare professional for medical advice.
                                        </p>
                                    </div>
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