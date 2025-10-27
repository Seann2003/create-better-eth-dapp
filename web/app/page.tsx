"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  AuthProviders,
  ClientProviders,
  ContractFrameworks,
  PackageManagers,
} from "@/data/types";

export default function Home() {
  const [projectName, setProjectName] = useState("my-better-eth-dapp");
  const [selectedAuth, setSelectedAuth] = useState<any>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [selectedPackageManager, setSelectedPackageManager] =
    useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthUpdate = (auth: any) => {
    setSelectedAuth(auth);
  };

  const handleClientUpdate = (client: any) => {
    setSelectedClient(client);
  };

  const handleContractUpdate = (contract: any) => {
    setSelectedContract(contract);
  };
  const handlePackageManagerUpdate = (packageManager: any) => {
    setSelectedPackageManager(packageManager);
  };

  const generateCommand = (selectedPackageManager: any) => {
    const baseCommand = `$ ${
      selectedPackageManager?.value || "bun"
    } create better-eth-dapp@latest ${projectName}`;
    const flags = [
      selectedAuth?.value,
      selectedClient?.value,
      selectedContract?.value,
    ]
      .filter(Boolean)
      .join(" ");
    return `${baseCommand} ${flags} --yes`;
  };

  const getAllSelectedStack = () => {
    return [selectedAuth, selectedClient, selectedContract].filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-gray-900 font-sans">
      <div className="container mx-auto px-6">
        {isScrolled && (
          <div className="backdrop-blur sticky flex justify-center items-center top-0 h-10 z-50 w-[calc(100%+2rem)] -mx-4 bg-[#f2f2f2]/80"></div>
        )}
        <Navbar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Filter options
              </label>
              <input
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 transition-colors"
                placeholder="Filter by option"
              ></input>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Project Name:
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="my-better-eth-dapp"
                />
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <code className="text-xs text-gray-700 font-mono mr-2 mb-2">
                    {generateCommand(selectedPackageManager)}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        generateCommand(selectedPackageManager)
                      )
                    }
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Selected Stack:
                </h3>
                <div className="min-h-[120px] bg-gray-50 border border-gray-200 rounded-lg p-4">
                  {getAllSelectedStack().length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No technologies selected
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {getAllSelectedStack().map((item) => (
                        <div
                          key={item.label}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200"
                        >
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={16}
                            height={16}
                            className="mr-2"
                          />
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 active:shadow-lg active:scale-[0.98] transition-all duration-150"
                >
                  Reset
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 active:shadow-lg active:scale-[0.98] transition-all duration-150"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card
              category="Auth Providers"
              options={AuthProviders}
              onStackUpdate={handleAuthUpdate}
              selectedValue={selectedAuth}
            />
            <Card
              category="Client Providers"
              options={ClientProviders}
              onStackUpdate={handleClientUpdate}
              selectedValue={selectedClient}
            />
            <Card
              category="Contract Frameworks"
              options={ContractFrameworks}
              onStackUpdate={handleContractUpdate}
              selectedValue={selectedContract}
            />
            <Card
              category="Package Managers"
              options={PackageManagers}
              onStackUpdate={handlePackageManagerUpdate}
              selectedValue={selectedPackageManager}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
