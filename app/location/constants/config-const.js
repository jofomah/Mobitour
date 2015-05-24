'use strict';

angular
		.module('location')
		.constant('LOCATIONS', {
			FIXTURE: [
				{
					"name": "Ade Super Hotel",
					"address": "Ilesha Road",
					"type": "hotel",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "very-high"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"pool",
						"gym",
						"mart",
						"conference hall",
						"internet facilities"
					],
					"doc_type": "location",
					"images": ["ade super hotel.jpg"]
				},
				{
					"name": "Ayus Hotel ",
					"address": "Ondo Road",
					"type": "hotel",
					"preferences": {
						"budget": "medium",
						"size": "medium",
						"cultural": "high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"internet facilities"
					],
					"doc_type": "location",
					"images": ["ayus hotel.jpg"]
				},
				{
					"name": "Josemilla Hotel",
					"address": "Ondo Road",
					"type": "hotel",
					"preferences": {
						"budget": "very-high",
						"size": "very-high",
						"cultural": "very-high",
						"facilities": "medium"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"conference hall",
						"internet facilities"
					],
					"doc_type": "location",
					"images": ["Josemilia hotel.jpg"]
				},
				{
					"name": "Solab Suites",
					"address": "Futa Road",
					"type": "hotel",
					"preferences": {
						"budget": "low",
						"size": "low",
						"cultural": "high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"conference hall"
					],
					"doc_type": "location",
					"images": ["solab suites hotel.jpg"]
				},
				{
					"name": "AT & T Presidential Hotel",
					"address": "No. 5 Ilesha-Owo Express Road",
					"type": "hotel",
					"preferences": {
						"budget": "very-high",
						"size": "very-high",
						"cultural": "very-high",
						"facilities": "high"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"pool",
						"gym",
						"conference hall"
					],
					"doc_type": "location",
					"images": ["a&t presidential hotel.jpg"]
				},
				{
					"name": "Helena Hotel",
					"address": "Ado-Owo Road",
					"type": "hotel",
					"preferences": {
						"budget": "medium",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"pool",
						"conference hall"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Green Park Motel",
					"address": "Oke-Aro",
					"type": "hotel",
					"preferences": {
						"budget": "high",
						"size": "high",
						"cultural": "very-high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Round D' clock Guest House",
					"address": "Ijoka",
					"type": "hotel",
					"preferences": {
						"budget": "low",
						"size": "low",
						"cultural": "high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "International Rainbow Hotel",
					"address": "Oluwatuyi",
					"type": "hotel",
					"preferences": {
						"budget": "medium",
						"size": "high",
						"cultural": "high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"conference hall",
						"internet facilities"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Akure Plaza Motel",
					"address": "Oke-Ijebu",
					"type": "hotel",
					"preferences": {
						"budget": "high",
						"size": "high",
						"cultural": "high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Hostwell Guest House",
					"address": "Ijapo Estate",
					"type": "hotel",
					"preferences": {
						"budget": "high",
						"size": "high",
						"cultural": "high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"internet facilities"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Sunview Hotel",
					"address": "Alagbaka",
					"type": "hotel",
					"preferences": {
						"budget": "high",
						"size": "very-high",
						"cultural": "very-high",
						"facilities": "very-high"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"pool",
						"gym",
						"mart",
						"internet facilities"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Flourish Hotel",
					"address": "Alagbaka",
					"type": "hotel",
					"preferences": {
						"budget": "high",
						"size": "high",
						"cultural": "very-high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Emperor Hotel",
					"address": "Alagbaka",
					"type": "hotel",
					"preferences": {
						"budget": "medium",
						"size": "high",
						"cultural": "very-high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"gym",
						"internet facilities"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "First Victoria Hotel",
					"address": "Ijapo Estate",
					"type": "hotel",
					"preferences": {
						"budget": "high",
						"size": "very-high",
						"cultural": "very-high",
						"facilities": "very-high"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"pool",
						"gym",
						"conference hall",
						"internet facilities"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Parklane Hotel",
					"address": "Ijapo Estate",
					"type": "hotel",
					"preferences": {
						"budget": "medium",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"pool",
						"conference hall"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Solton Hotel",
					"address": "Ijapo Estate",
					"type": "hotel",
					"preferences": {
						"budget": "very-high",
						"size": "very-high",
						"cultural": "high",
						"facilities": "low"
					},
					"ammenities": [
						"Accommodation",
						"Relaxation",
						"Laundry",
						"conference hall"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "+18 Sport Bar",
					"address": "Aule Road",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Food",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Rock-Land Sport Bar",
					"address": "Futa Road",
					"type": "bar",
					"preferences": {
						"budget": "medium",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Fish",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Ashabi Bar",
					"address": "Oke-Aro",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Pepper-soup"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Champion Galaxy Bar",
					"address": "Champion Junction",
					"type": "bar",
					"preferences": {
						"budget": "medium",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Big Daddy Relaxation Garden",
					"address": "Alagbaka",
					"type": "bar",
					"preferences": {
						"budget": "medium",
						"size": "high",
						"cultural": "medium",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Aso Rock Bar",
					"address": "Oluwatuji Road",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Food",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "House 2",
					"address": "Oke-Aro",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "very-high",
						"cultural": "very-high",
						"facilities": "very-high"
					},
					"ammenities": [
						"Accomodation",
						"Drinks",
						"Food",
						"Pepper-soup"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Edo Super Bar",
					"address": "Ijoka",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "medium",
						"cultural": "medium",
						"facilities": "medium"
					},
					"ammenities": ["Drinks"],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Favour P Spices & Beer Palour",
					"address": "Old Sijuode junction",
					"type": "bar",
					"preferences": {
						"budget": "high",
						"size": "medium",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Food"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Divine Garden",
					"address": "Oba-ile Road",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Food",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "17:59",
					"address": "Alagbaka",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "high"
					},
					"ammenities": [
						"Drinks",
						"Food",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "Mega 4 Bar",
					"address": "Oba Adesina Road",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "De Ultimate Bar",
					"address": "Oluwatuji Road",
					"type": "bar",
					"preferences": {
						"budget": "low",
						"size": "high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Accomodation",
						"Drinks",
						"Food",
						"Pepper-soup",
						"barbecue"
					],
					"doc_type": "location",
					"images": []
				},
				{
					"name": "De White Bar",
					"address": "Ojo Akadiri Street, Alagbaka",
					"type": "bar",
					"preferences": {
						"budget": "medium",
						"size": "very-high",
						"cultural": "high",
						"facilities": "medium"
					},
					"ammenities": [
						"Drinks",
						"Food"
					],
					"doc_type": "location",
					"images": []
				}
			]
		});
