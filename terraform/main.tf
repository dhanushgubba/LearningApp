provider "aws" {
  region = "ap-south-1"
}

# EC2 Instance for Backend
resource "aws_instance" "backend" {
  ami           = "ami-023a307f3d27ea427" 
  instance_type = "t2.micro"
  key_name      = "ansible_CD" 

  security_groups = [aws_security_group.backend_sg.name]

  tags = {
    Name = "learn-backend"
  }
}

# Security Group for EC2
resource "aws_security_group" "backend_sg" {
  name = "learn-backend-sg"

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22    # SSH for Ansible
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# S3 Bucket for Frontend
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "learn-frontend-static"
  force_destroy = true

  tags = {
    Name = "learn-frontend-static"
  }
}