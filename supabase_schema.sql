-- Consortium Against Rabies (CAR) - Supabase Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- 1. Create table for Life Members
CREATE TABLE IF NOT EXISTS members (
  id BIGSERIAL PRIMARY KEY,
  membership_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  institution_location TEXT,
  state_code VARCHAR(10),
  state_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for instant searching
CREATE INDEX IF NOT EXISTS idx_members_name ON members USING gin (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_members_membership_id ON members (membership_id);
CREATE INDEX IF NOT EXISTS idx_members_state_code ON members (state_code);

-- 3. Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to search and read members
CREATE POLICY "Public members are viewable by everyone"
  ON members FOR SELECT
  USING (true);

-- Allow authenticated admins / server routes to insert, update, delete
DROP POLICY IF EXISTS "Admins can manage members" ON members;
CREATE POLICY "Enable all access for members"
  ON members FOR ALL
  USING (true)
  WITH CHECK (true);

-- 4. Create table for Membership Applications
CREATE TABLE IF NOT EXISTS membership_applications (
  id BIGSERIAL PRIMARY KEY,
  reference VARCHAR(50) UNIQUE NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  qualification VARCHAR(255),
  speciality VARCHAR(255),
  designation VARCHAR(255),
  institution TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  registrationNumber VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  approved_membership_id VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit membership applications"
  ON membership_applications FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage applications" ON membership_applications;
CREATE POLICY "Enable all access for applications"
  ON membership_applications FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Initial Seed Data (179 Life Members)
INSERT INTO members (id, membership_id, name, designation, institution_location, state_code, state_name)
VALUES
(1, 'DL/CAR/001', 'Dr A T Kannan', 'Formerly Prof and Head', 'Department of Community Medicine, UCMS & GTB Hospital Delhi -95.', 'DL', 'Delhi'),
(2, 'DL/CAR/002', 'Dr. Anurag Agarwal', 'Associate Professor Paediatrics', 'Maulana Azad Medical College, Delhi -110039', 'DL', 'Delhi'),
(3, 'DL/CAR/003', 'Dr. R.B.Jain', 'PGIMS Rohtak Haryana -1216102', '', 'DL', 'Delhi'),
(4, 'DL/CAR/004', 'Dr. G.P.Kaushal', 'Paediatrician', 'Dr Baba Saheb Ambedkar hospital,Rohini, Delhi', 'DL', 'Delhi'),
(5, 'DL/CAR/005', 'Dr. Govardhan Meena', 'Jaipur', '', 'DL', 'Delhi'),
(6, 'UK/CAR/006', 'Dr. Anil Arya', 'Doon Hospital Dehradun – 248001', '', 'UK', 'Uttarakhand'),
(7, 'DL/CAR/007', 'Dr. Aman Pratap', 'HOD Paeditrics', 'Bhagwan Mahavir Hospital, Vikas Puri Delhi-110018', 'DL', 'Delhi'),
(8, 'UP/CAR/008', 'Dr. Ramesh Chandra Gupta', 'Combined District Hospital', 'Sanjay Nagar Ghaziabad UP.', 'UP', 'Uttar Pradesh'),
(9, 'DL/CAR/009', 'Dr Khan Amir Maroof', 'Associate Professor', 'Department of Community Medicine,, UCMS & GTB Hospital,, Delhi-95', 'DL', 'Delhi'),
(10, 'DL/CAR/010', 'Dr. Mohammad Akhtar Hussain', 'Senior Lecturer, IIPH-B', 'Bhubaneshwar, Orissa', 'DL', 'Delhi'),
(11, 'DL/CAR/011', 'Dr. Somdatta Patra', 'Lecturer, Department of Community Medicine', 'UCMS & GTB Hospital Delhi-95', 'DL', 'Delhi'),
(12, 'DL/CAR/012', 'Dr. Anita Gupta', 'Dept of Community Medicine', 'UCMS & GTB Hospital, Delhi-110095', 'DL', 'Delhi'),
(13, 'DL/CAR/013', 'Dr. Gyan Prakash', 'Safdurjung Hospital', 'New Delhi', 'DL', 'Delhi'),
(14, 'DL/CAR/014', 'Dr. Rajender Singh', 'Delhi', '', 'DL', 'Delhi'),
(15, 'DL/CAR/015', 'Dr. Gaurav Kumar', 'Delhi', '', 'DL', 'Delhi'),
(16, 'DL/CAR/016', 'Dr. Ajay Gambhir', 'Pediatrician', 'New Delhi', 'DL', 'Delhi'),
(17, 'DL/CAR/017', 'Dr. Sanjay Patidar', 'Community Medicine', 'UCMS & GTB Hospital,, Delhi-95', 'DL', 'Delhi'),
(18, 'HP/CAR/018', 'Dr. Omesh Bharti', 'Himachal Pradesh', '', 'HP', 'Himachal Pradesh'),
(19, 'UK/CAR/019', 'Dr. Surekha Kishore', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(20, 'UK/CAR/020', 'Dr. Jairaj Hanspal', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(21, 'DL/CAR/023', 'Dr. Suneela Garg', 'Professor of Community Medicine', 'Maulana Azad Medical College, Delhi', 'DL', 'Delhi'),
(22, 'UP/CAR/024', 'Dr. V.K.Srivastava', 'Prof & Head', 'KGMU,, Lucknow', 'UP', 'Uttar Pradesh'),
(23, 'DL/CAR/025', 'Dr. S.K.Rasania', 'Professor, Community Medicine', 'VMMC, Delhi', 'DL', 'Delhi'),
(24, 'DL/CAR/026', 'Nikhil SV', 'Laxmi Puram', 'Mysore', 'DL', 'Delhi'),
(25, 'DL/CAR/027', 'Dr. Shukla Das Professor', 'Department of Microbiology', 'UCMS & GTB Hospital Delhi-110095', 'DL', 'Delhi'),
(26, 'DL/CAR/028', 'Dr. Sandeep Agarwal', 'Senior Resident', 'Lady Hardinge Medical College, New Delhi', 'DL', 'Delhi'),
(27, 'DL/CAR/029', 'Dr. Rahul Sharma', 'Lecturer', 'Community Medicine, UCMS & GTB Hospital, Delhi-110095', 'DL', 'Delhi'),
(28, 'DL/CAR/030', 'Dr. Vikram K', 'Community Medicine', 'UCMS & GTB Hospital, Delhi-110095', 'DL', 'Delhi'),
(29, 'DL/CAR/031', 'Dr. Sachin Gupta', 'Community Medicine', 'UCMS & GTB Hospital, Delhi-110095', 'DL', 'Delhi'),
(30, 'DL/CAR/032', 'Dr. Madhu Upadhyay', 'Lecturer, Community Medicine', 'UCMS & GTB Hospital, Delhi-110095', 'DL', 'Delhi'),
(31, 'DL/CAR/033', 'Dr. Rupali Roy', 'Department of Community Medicine', 'UCMS & GTB Hospital Delhi-95', 'DL', 'Delhi'),
(32, 'DL/CAR/034', 'Dr. Ganesh Kumar', 'Lecturer, SRM University, Chennai', '', 'DL', 'Delhi'),
(33, 'DL/CAR/035', 'Dr. Rahul Bansal', 'Professor and Head, Community Medicine', 'Subharti Medical College, Meerut U.P.', 'DL', 'Delhi'),
(34, 'DL/CAR/036', 'Dr. Paras Agarwal', 'Dept of Community Medicine', 'UCMS & GTB Hospital Delhi-95', 'DL', 'Delhi'),
(35, 'DL/CAR/037', 'Dr. Alka Agarwal', 'Community Medicine', 'UCMS & GTB Hospital, Delhi-95', 'DL', 'Delhi'),
(36, 'UP/CAR/038', 'Dr. Pawan Kumar Goel', 'Doctor', 'Professor,, Dept. of Community Medicine Muzaffarnagar,, Medical College, Muzaffarnagar, UP', 'UP', 'Uttar Pradesh'),
(37, 'DL/CAR/039', 'Dr. J.P.Kapoor', 'Delhi', '', 'DL', 'Delhi'),
(38, 'UP/CAR/040', 'Dr. Pramod Kumar', 'District Hospital Campus', 'Ghaziabad', 'UP', 'Uttar Pradesh'),
(39, 'RJ/CAR/041', 'Dr. Mahesh Keswani', 'Vaishali Nagar, Ajmer, Rajasthan', '', 'RJ', 'Rajasthan'),
(40, 'UK/CAR/042', 'Dr. Sanjay Pandey', 'Dept of Community and Family Medicine', 'AIIMS Patna, Bihar', 'UK', 'Uttarakhand'),
(41, 'UK/CAR/043', 'Dr. Sadhna Awasthi', 'Assistant Professor, Dept of Community Medicine', 'Govt Med College, Haldwani, Nainital', 'UK', 'Uttarakhand'),
(42, 'UK/CAR/044', 'Dr. Sanjay Kumar Jha', 'Assistant Professor, Dept of Community Medicine', 'Govt Med College, Haldwani, Nainital', 'UK', 'Uttarakhand'),
(43, 'UK/CAR/045', 'Dr. C.M.S.Rawat', 'Professor and Head, Community Medicine', 'Govt Med College, Haldwani, Nainital', 'UK', 'Uttarakhand'),
(44, 'UK/CAR/046', 'Dr. S.C.S. Koranga', 'Sheesh Mahal, Kathgodam', 'Nainital, Uttarakhand', 'UK', 'Uttarakhand'),
(45, 'UK/CAR/047', 'Dr. Himanshu Misra', 'Medical Officer, Distt HMG Hospital', 'Haridwar, Uttarakhand', 'UK', 'Uttarakhand'),
(46, 'CH/CAR/048', 'Dr. Jagdish Chander', 'Professor and Head, Dept of Microbiology', 'Govt Med Coll & Hosp, Chandigarh', 'CH', 'Chandigarh'),
(47, 'CH/CAR/049', 'Dr. Dinesh Mirok', 'Chandigarh', '', 'CH', 'Chandigarh'),
(48, 'CH/CAR/050', 'Dr. Tania Aneta', 'Chandigarh', '', 'CH', 'Chandigarh'),
(49, 'CH/CAR/051', 'Dr. Naveen Goel', 'Formerly Professor and Head', 'Dept of Community Medicine, GMCH, Chandigarh', 'CH', 'Chandigarh'),
(50, 'UP/CAR/052', 'Dr. Pawan Parashar', 'Professor of Community Medicine', 'Subharti Medical College, Meerut, U.P.', 'UP', 'Uttar Pradesh'),
(51, 'CH/CAR/053', 'Dr. Aditi Mehra', 'Chandigarh', '', 'CH', 'Chandigarh'),
(52, 'CH/CAR/054', 'Dr. Sandeep Singh Sarpal', 'Vigyan Vihar Society, Chandigarh', '', 'CH', 'Chandigarh'),
(53, 'CH/CAR/055', 'Dr. Amarjit Singh', 'Chandigarh', '', 'CH', 'Chandigarh'),
(54, 'DL/CAR/056', 'Dr. Shama Shaikh', 'Lecturer, Community Medicine', 'MLN Medical College, Allahabad', 'DL', 'Delhi'),
(55, 'HR/CAR/057', 'Dr. Jagbir Singh', 'Medical Enclave, PGIMS, Rohtak', '', 'HR', 'Haryana'),
(56, 'HR/CAR/058', 'Dr. Rambha Pathak', 'Panchkula, Haryana', '', 'HR', 'Haryana'),
(57, 'DL/CAR/059', 'Dr Reeti Tewari', 'Dept of Community Medicine', 'UCMS & GTB Hospital, Delhi - 95', 'DL', 'Delhi'),
(58, 'CH/CAR/060', 'Dr. Sonia Puri', 'Dept of Community Medicine', 'GMCH, Chandigarh', 'CH', 'Chandigarh'),
(59, 'UP/CAR/061', 'Dr. Tanveer Bano', 'Assistant Professor', 'Dept of Community Medicine,, LLRM Medical College, Meerut', 'UP', 'Uttar Pradesh'),
(60, 'UK/CAR/062', 'Dr. Megha Luthra', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(61, 'UK/CAR/063', 'Dr. Roopa Hanspal', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(62, 'UK/CAR/064', 'Dr. Kajal Jain', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(63, 'UK/CAR/065', 'Dr. Puneet Ohri', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(64, 'UK/CAR/066', 'Dr. Sadhna Singh', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(65, 'UK/CAR/067', 'Dr. Anant Prakash Rank', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(66, 'UK/CAR/068', 'Dr. Ashwani Sharma', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(67, 'UK/CAR/069', 'Dr. Chetanjit Barua', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(68, 'UK/CAR/070', 'Dr. P K Chandola', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(69, 'UK/CAR/071', 'Dr. Shikha Mathur', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(70, 'UK/CAR/072', 'Dr.Pankaj Kumar Mishra', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(71, 'UK/CAR/073', 'Dr. Arvind Kumar Shukla', 'Dehradun, Uttarakhand.', '', 'UK', 'Uttarakhand'),
(72, 'OD/CAR/074', 'Dr. Rabindra Nath Rout', 'Professor and Head, Community Medicine', 'Kalinga Institute of Medical Sciences,, Bhubhaneshwar, Odisha', 'OD', 'OD'),
(73, 'OD/CAR/075', 'Dr. Omprakash Panigrahi', 'Dept of Community Medicine', 'Kalinga Institute of Medical Sciences, Bhubhaneshwar, Odisha', 'OD', 'OD'),
(74, 'UK/CAR/076', 'Dr. Shashikant Nagaonkar', 'Govt Medical College, Srinagar', 'Uttarakhand', 'UK', 'Uttarakhand'),
(75, 'UP/ASM/CAR/077', 'Mr. Ashutosh Gupta', 'Bareilly, Uttar Pradesh', '', 'UP', 'Uttar Pradesh'),
(76, 'UK/CAR/078', 'Dr. Ashwin Garg', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(77, 'UK/CAR/079', 'Dr. Amardeep Singh', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(78, 'UK/CAR/080', 'Dr. Sanjeev Gupta', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(79, 'UK/CAR/081', 'Dr. Kuldeep Dutta', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(80, 'UK/CAR/082', 'Dr. Alok Semwal', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(81, 'UP/CAR/083', 'Dr. (Col) Arvind Shukla', 'Farrukhabad, Uttar Pradesh', '', 'UP', 'Uttar Pradesh'),
(82, 'UK/CAR/084', 'Dr. Rajiv Kumar', 'Dehradun, Uttarakhand', '', 'UK', 'Uttarakhand'),
(83, 'JK/CAR/085', 'Dr. S. Muhammad Salim Khan', 'Srinagar, Jammu and Kashmir', '', 'JK', 'Jammu & Kashmir'),
(84, 'DL/HM/CAR/086', 'Dr. Veena Mittal', 'NCDC, Delhi', '', 'DL', 'Delhi'),
(85, 'DL/HM/CAR/087', 'Dr. Mala Chhabra', 'RML Hospital, Delhi', '', 'DL', 'Delhi'),
(86, 'DL/CAR/088', 'Dr. Narinder Singh Khurana', 'Maharishi Valmiki Hospital', 'Rohini, New Delhi 110089', 'DL', 'Delhi'),
(87, 'DL/CAR/089', 'Dr. Deepak Gautam', 'Delhi', '', 'DL', 'Delhi'),
(88, 'DL/CAR/090', 'Dr. Sunil Kumar Gupta', 'Delhi', '', 'DL', 'Delhi'),
(89, 'DL/CAR/091', 'Dr. Ram Asare', 'Pediatrician Delhi', '', 'DL', 'Delhi'),
(90, 'DL/CAR/092', 'Dr. Kamal Agrawal', 'Professor of Community Medicine', 'UCMS & GTB Hosptital,, Delhi', 'DL', 'Delhi'),
(91, 'DL/CAR/093', 'Dr. Gajendra Singh Meena', 'Professor of Community Medicine', 'MAMC, Delhi', 'DL', 'Delhi'),
(92, 'UK/CAR/094', 'Dr. BholaNath', 'Govt Medical College, Srinagar', 'Uttarakhand', 'UK', 'Uttarakhand'),
(93, 'UK/CAR/095', 'Dr. Ranjeeta Kumari', 'AIIMS, Rishikesh', 'Uttarakhand', 'UK', 'Uttarakhand'),
(94, 'TN/CAR/096', 'Dr. Elayakumar', 'Tamil Nadu', '', 'TN', 'Tamil Nadu'),
(95, 'DL/CAR/097', 'Dr. Rumpa Saha', 'UCMS', 'New Delhi', 'DL', 'Delhi'),
(96, 'MH/CAR/098', 'Dr. Manish Taywade', 'Community Medicine', 'MGIMS, Wardha, Maharashtra', 'MH', 'Maharashtra'),
(97, 'RJ/CAR/099', 'Dr. Pankaja R Raghav', 'Community Medicine', 'AIIMS, Jodhpur, Rajasthan', 'RJ', 'Rajasthan'),
(98, 'RJ/CAR/100', 'Dr. Pankaj Bhardwaj', 'Community Medicine', 'AIIMS, Jodhpur, Rajasthan', 'RJ', 'Rajasthan'),
(99, 'RJ/CAR/101', 'Dr. Dewesh Kumar', 'Community Medicine', 'AIIMS, Jodhpur, Rajasthan', 'RJ', 'Rajasthan'),
(100, 'RJ/CAR/102', 'Dr. Ranabir Pal', 'Community Medicine', 'AIIMS, Jodhpur, Rajasthan', 'RJ', 'Rajasthan'),
(101, 'RJ/CAR/103', 'Dr. Mahendra Singh', 'Community Medicine', 'AIIMS, Jodhpur, Rajasthan', 'RJ', 'Rajasthan'),
(102, 'DL/CAR/104', 'Dr. Mukesh Narang', 'Pediatrician', 'Delhi', 'DL', 'Delhi'),
(103, 'KA/CAR/105', 'Dr. Sowmya Bharath', 'Veterinary Pathologist', 'Bengaluru, Karnataka', 'KA', 'Karnataka'),
(104, 'UP/CAR/106', 'Dr. Manish Singh', 'Department of Community Medicine', 'Government Medical College, Kannauj, Uttar Pradesh', 'UP', 'Uttar Pradesh'),
(105, 'UP/CAR/107', 'Dr. Naresh Pal Singh', 'Department of Community Medicine', 'Uttar Pradesh University of Medical Sciences (UPUMS), Saifai, Etawah,, Uttar Pradesh, Pincode: 206130', 'UP', 'Uttar Pradesh'),
(106, 'UP/CAR/108', 'Dr. Anand Mohan Dixit', 'Department of Community Medicine', 'Uttar Pradesh University of Medical Sciences (UPUMS), Saifai, Etawah,, Uttar Pradesh, Pincode: 206130', 'UP', 'Uttar Pradesh'),
(107, 'UP/CAR/109', 'Dr. Dhiraj Kumar Srivastava', 'Department of Community Medicine', 'Uttar Pradesh University of Medical Sciences (UPUMS), Saifai, Etawah,, Uttar Pradesh Pincode: 206130', 'UP', 'Uttar Pradesh'),
(108, 'UP/CAR/110', 'Dr. Peeyush Kariwala', 'Department of Community Medicine', 'Uttar Pradesh University of Medical Sciences (UPUMS), Saifai, Etawah,, Uttar Pradesh Pincode: 206130', 'UP', 'Uttar Pradesh'),
(109, 'UP/CAR/111', 'Dr. Ajay Gupta', 'Doctor', 'Muskan Clinic, Priyadarshini Vihar,, Delhi', 'UP', 'Uttar Pradesh'),
(110, 'UP/CAR/112', 'Dr. J.V.Singh', 'Dean', 'Hind Institute of Medical Sciences,, Safedabad, Barabanki, Uttar Pradesh', 'UP', 'Uttar Pradesh'),
(111, 'UP/CAR/113/V', 'Dr. Gaya Prasad', 'Vice Chancellor', 'Sardar Vallabhbhai Patel University of Agriculture, Meerut,, Uttar Pradesh', 'UP', 'Uttar Pradesh'),
(112, 'DL/CAR/114', 'Dr. Ravindra Kumar', 'Delhi', '', 'DL', 'Delhi'),
(113, 'DL/CAR/115', 'Dr. Ashok Dua', 'Delhi', '', 'DL', 'Delhi'),
(114, 'DL/CAR/116', 'Dr. Yogesh Kumar Kushwaha', 'Delhi', '', 'DL', 'Delhi'),
(115, 'DL/CAR/117/Assoc', 'Mrs. Sheena Joseph', 'Delhi', '', 'DL', 'Delhi'),
(116, 'DL/CAR/118', 'Dr. Amita Agarwal', 'Rohini', 'Delhi', 'DL', 'Delhi'),
(117, 'DL/CAR/119', 'Dr. Rajesh Gupta', 'Ashok Vihar', 'Delhi', 'DL', 'Delhi'),
(118, 'DL/CAR/120', 'Dr. H. K. Gohil', 'Shalimar Bagh', 'Delhi', 'DL', 'Delhi'),
(119, 'DL/CAR/121', 'Dr. PC Prabhakar', 'Rohini', 'Delhi', 'DL', 'Delhi'),
(120, 'DL/CAR/122', 'Dr. Rishi Kanava', 'Paschim Vihar', 'Delhi', 'DL', 'Delhi'),
(121, 'DL/CAR/123', 'Dr. Ajay Kumar', 'EDMC, East Delhi', 'Delhi', 'DL', 'Delhi'),
(122, 'BR/CAR/124', 'Dr. Navin Kumar', 'Narayan Medical College and Hospital', 'Jamuhar, Rohtas,, Bihar', 'BR', 'Bihar'),
(123, 'BR/CAR/125', 'Dr. Shaan Ahmed', 'Community Medicine', 'NMCH, Patna', 'BR', 'Bihar'),
(124, 'BR/CAR/126', 'Dr. Rachna Rani', 'Community Medicine', 'NMCH, Patna', 'BR', 'Bihar'),
(125, 'BR/CAR/127', 'Dr. Rehana Anjum', 'Community Medicine', 'NMCH, Patna', 'BR', 'Bihar'),
(126, 'BR/CAR/128', 'Dr. Prashant Kumar', 'Community Medicine', 'NMCH, Patna', 'BR', 'Bihar'),
(127, 'DL/CAR/129', 'Dr. Reema Dua', 'Delhi', '', 'DL', 'Delhi'),
(128, 'UP/CAR/130', 'Dr. Dhananjay Kumar Singh', 'Heritage Institute of Medical Sciences', 'Varanasi, Uttar Pradesh', 'UP', 'Uttar Pradesh'),
(129, 'UP/CAR/131', 'Dr. Lalan Kumar Bharti', 'Doctor', 'Patparganj, Delhi', 'UP', 'Uttar Pradesh'),
(130, 'HP/CAR/132', 'Dr. Sunil Raina', 'Associate Professor', 'Community Medicine,, Dr RP Government Medical College, Tanda, Himachal Pradesh', 'HP', 'Himachal Pradesh'),
(131, 'HP/CAR/133', 'Dr Abhilash Sood', 'Assistant Professor', 'Community Medicine,, Dr RP Government Medical College, Tanda, Himachal Pradesh', 'HP', 'Himachal Pradesh'),
(132, 'UP/CAR/134', 'Dr Prashaant Kumar Bhatnagar', 'Assistant Professor', 'Community Medicine, LLRM Medical College, Meerut,, Uttar Pradesh, India', 'UP', 'Uttar Pradesh'),
(133, 'UP/CAR/135', 'Dr Pradip Kharya', 'Assistant Professor', 'Community Medicine, Uttar Pradesh University of MedicalSciences,, Saifai, Etawah,, Uttar Pradesh, India', 'UP', 'Uttar Pradesh'),
(134, 'UP/CAR/136', 'Dr Sandip Kumar s/o Mr RS Gupta', 'Professor', 'Community Medicine, Uttar Pradesh University of MedicalSciences,, Saifai, Etawah,, Uttar Pradesh, India', 'UP', 'Uttar Pradesh'),
(135, 'MH/CAR/137 (Provisional)', 'Vijaya Vasant Jamdhade', 'Staff Nurse', 'Rural Hospital, Rahata,, Distt Ahmednagar, Maharashtra, India', 'MH', 'Maharashtra'),
(136, 'MH/CAR/138 (Provisional)', 'Archana Vithal Kakade', 'Non Medical Assistant', 'ADHS Leprosy Satara, Maharashtra, India', 'MH', 'Maharashtra'),
(137, 'MH/CAR/139 (Provisional)', 'Mahendra Pandurang Warhal', 'Non medical Assistant', 'Assistant Director, Health Services (L_, Thane, Maharashtra, India', 'MH', 'Maharashtra'),
(138, 'K/CAR/140 (Provisional)', 'Dr Mohammad Sadiq Khan', 'Communication Officer', 'Dept of Health and Family Welfare,, Jammu and Kashmir, India', 'K', 'Jammu & Kashmir'),
(139, 'DL/CAR/141 (Honorary Life membership)', 'Dr Raman Kumar', 'Family Physician', 'President, Association of Family Physicians of India,, Delhi NCR, India', 'DL', 'Delhi'),
(140, 'DL/CAR/142', 'Dr Dinesh Mittal', 'Rohini, Delhi', 'India', 'DL', 'Delhi'),
(141, 'DL/CAR/143', 'Dr Shaileja Yadav', 'UCMS and GTBH, Delhi', 'India', 'DL', 'Delhi'),
(142, 'UP/CAR/144', 'Dr Anas Ahmad Khan', 'IIMSR, Integral University, Lucknow', 'Uttar Pradesh,, India', 'UP', 'Uttar Pradesh'),
(143, 'UP/CAR/145', 'Dr Manodeep Sen', 'DRRMLIMS, Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(144, 'UP/CAR/146', 'Dr Sushil Kumar Shukla', 'UPUMS, Saifai, Etawah, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(145, 'UP/CAR/147', 'Dr Vineeta Shukla', 'DRRMLIMS Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(146, 'UP/CAR/148', 'Dr Rashmi Kumari', 'DRRMLIMS, Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(147, 'UP/CAR/149', 'Dr Anamika Chandra1', 'DRRMLIMS, Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(148, 'UP/CAR/150', 'Dr Sugandha Jauhari', 'DRRMLIMS, Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(149, 'UP/CAR/151', 'Dr Shikhar Singh', 'DRRMLIMS, Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(150, 'UP/CAR/152', 'Dr SD Kandpal', 'DRRMLIMS, Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(151, 'UP/CAR/153', 'Dr Arshi Ansari', 'DRRMLIMS, Lucknow, Uttar Pradesh', 'India', 'UP', 'Uttar Pradesh'),
(152, 'UP/CAR/154', 'Dr Arun Wadhwa', 'Pediatrician', 'New Delhi, India', 'UP', 'Uttar Pradesh'),
(153, 'UP/CAR/155', 'Dr Dinesh K Goel', 'Pediatrician', 'New Delhi, India', 'UP', 'Uttar Pradesh'),
(154, 'UK/CAR/156', 'Dr Shaili Vyas', 'Community Medicine', 'Uttarakhand, India', 'UK', 'Uttarakhand'),
(155, 'UK/CAR/157', 'Dr Neha Sharma', 'Community Medicine', 'Uttarakhand, India', 'UK', 'Uttarakhand'),
(156, 'UP/CAR/089', 'Dr Husain Haider Abbas', 'Lucknow, UP', 'India', 'UP', 'Uttar Pradesh'),
(157, 'CG/CAR/158', 'Dr Snehashree Sadhanala', 'Zonal Coordinator NTD', 'Chhattisgarh, India', 'CG', 'CG'),
(158, 'UP/CAR/159', 'Dr Anil Koparkar', 'Department of Community and Family Medicine, AIIMS', 'Gorakhpur, India', 'UP', 'Uttar Pradesh'),
(159, 'GJ/CAR/160', 'Dr Anjali Modi', 'Community and Family Medicine AIIMS Rajkot', 'Gujarat, India', 'GJ', 'GJ'),
(160, 'GJ/CAR/161', 'Dr Ravina Tadvi', 'IIPHG, Gandhinagar', 'Gujarat, India', 'GJ', 'GJ'),
(161, 'GJ/CAR/162', 'Dr Yasobant Sandul', 'IIPHG, Gandhinagar', 'Gujarat, India', 'GJ', 'GJ'),
(162, 'GJ/CAR/163', 'Dr Shruti Lekha', 'Research Assistant', 'IIPHG, Gandhinagar, Gujarat, India', 'GJ', 'GJ'),
(163, 'GJ/CAR/164', 'Dr Shailee Patil', 'Research Assistant', 'IIPHG, Gandhinagar, Gujarat, India', 'GJ', 'GJ'),
(164, 'GJ/CAR/165', 'Dr Priya Bhavsar', 'Data Analyst', 'IIPHG, Gandhinagar, Gujarat, India', 'GJ', 'GJ'),
(165, 'GJ/CAR/166', 'Dr Samir K Rana', 'Former Mission Director', 'National Dairy Development Board, Gujarat, India', 'GJ', 'GJ'),
(166, 'GJ/CAR/167', 'Dr Poonam Trivedi', 'Junior Epidemiologist', 'IIPHG, Gandhinagar, Gujarat, India', 'GJ', 'GJ'),
(167, 'GJ/CAR/168', 'Dr Farjana Memon', 'IIPHG, Gandhinagar', 'Gujarat, India', 'GJ', 'GJ'),
(168, 'UP/CAR/169', 'Shri Yogesh Kumar Sharma', 'Noida', 'Uttar Pradesh, India', 'UP', 'Uttar Pradesh'),
(169, 'CH/CAR/170', 'Dr Ritin Mohindra', 'PGI Chandigarh', 'India', 'CH', 'Chandigarh'),
(170, 'DL/CAR/171', 'Dr Srishti Yadav', 'UCMS and GTB Hospital', 'Delhi, India', 'DL', 'Delhi'),
(171, 'DL/CAR/172', 'Dr Chander Kant', 'Consultant Pediatrician', 'Delhi, India', 'DL', 'Delhi'),
(172, 'KA/CAR/173', 'Dr Manjunatha VK', 'Community and Family Physician', 'Raichur, Karnataka', 'KA', 'Karnataka'),
(173, 'MH/CAR/174', 'Dr Suma Nair', 'School of Public Health', 'DY Patil School of Public Health, Navi Mumbai, Maharashtra', 'MH', 'Maharashtra'),
(174, 'JK/CAR/175', 'Dr Rajiv Kumar Gupta', 'Prof and Head, Community Medicine department', 'Govt Medical College, Jammu', 'JK', 'Jammu & Kashmir'),
(175, 'DL/CAR/176', 'Dr Charu Jain', 'Dept of Microbiology', 'University College of Medical Sciences and  GTB Hospital, Delhi', 'DL', 'Delhi'),
(176, 'JK/CAR/177', 'Dr Bhavna Langer', 'Community Medicine department', 'Govt Medical College, Jammu', 'JK', 'Jammu & Kashmir'),
(177, 'JK/CAR/178', 'Dr Rashmi Kumari', 'Community Medicine department', 'Govt Medical College, Jammu', 'JK', 'Jammu & Kashmir'),
(178, 'RJ/CAR/179', 'Dr Krishan Bihari Badaulia', 'Udaipur', 'Rajasthan', 'RJ', 'Rajasthan'),
(179, 'DL/CAR/180', 'Dr Nischal Yathagiri', 'UCMS and GTB Hospital', 'Delhi', 'DL', 'Delhi')
ON CONFLICT (membership_id) DO UPDATE SET
  name = EXCLUDED.name,
  designation = EXCLUDED.designation,
  institution_location = EXCLUDED.institution_location,
  state_code = EXCLUDED.state_code,
  state_name = EXCLUDED.state_name;

-- Fix sequence counter
SELECT setval('members_id_seq', (SELECT MAX(id) FROM members));
