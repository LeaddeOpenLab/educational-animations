#!/usr/bin/env python3
"""Compatibility entrypoint: batch delivery now uses reviewed stable-ID final records."""
import argparse
from ingest_delivery import ingest
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('final_records',help='JSON object or list with stable ID, media version and review evidence')
args=parser.parse_args()
print('Imported',ingest(args.final_records),'final records')
