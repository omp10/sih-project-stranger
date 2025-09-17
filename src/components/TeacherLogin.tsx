import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, KeyRound, School, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherLogin: React.FC = () => {
  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example login logic
    try {
      const res = await fetch('http://localhost:5000/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login_id: loginId, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('teacher', JSON.stringify(data.teacher));
        navigate('/teacher-dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  // ✅ Your return must be inside the component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      <div className="w-full max-w-md mx-auto animate-scale-in">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-4 text-white hover:bg-white/20"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-accent rounded-full w-fit">
              <School className="w-8 h-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-2xl font-heading text-foreground">
              Teacher Login
            </CardTitle>
            <p className="text-muted-foreground font-body">
              Access your teacher dashboard and manage classes
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teacherName" className="text-sm font-medium font-body">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="teacherName"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 font-body"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loginId" className="text-sm font-medium font-body">
                  Login ID
                </Label>
                <div className="relative">
                  <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loginId"
                    type="text"
                    placeholder="Enter your teacher ID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="pl-10 font-body"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium font-body">
                  Password
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 font-body"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-body text-lg transition-all duration-300 hover:scale-105"
                disabled={!name.trim() || !loginId.trim() || !password.trim()}
              >
                Access Teacher Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground font-body">
                Contact admin if you need assistance with your login credentials
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
  );
};

export default TeacherLogin


