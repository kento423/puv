import { NextResponse } from 'next/server';

export async function GET() {
const stats = [
    { label: 'HP', value: 0.7, original: 2700 },
    { label: '攻撃', value: 0.6, original: 150 },
    { label: '特攻', value: 0.9, original: 420 },
    { label: '防御', value: 0.4, original: 80 },
    { label: '特防', value: 0.3, original: 60 },
    { label: '素早さ', value: 0.5, original: 110 },
    { label: 'ratio', value: 0.9, original: 10 },
];

  return NextResponse.json(stats);
}